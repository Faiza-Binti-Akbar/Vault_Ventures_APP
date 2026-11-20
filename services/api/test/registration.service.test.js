const assert = require('node:assert/strict');
const { test } = require('node:test');

const { Argon2PasswordHasher } = require('../src/modules/auth/password-hasher');
const { DuplicateEmailError } = require('../src/modules/auth/registration.errors');
const { RegistrationService } = require('../src/modules/auth/registration.service');

const SYNTHETIC_PASSWORD = 'synthetic-course-project-password';
const VALID_INPUT = Object.freeze({
  email: '  Participant@Example.TEST ',
  password: SYNTHETIC_PASSWORD,
  roles: ['founder'],
  consents: [{ documentCode: 'terms', version: 'test-approved-v1' }],
});

class TransactionalMemoryRegistrationRepository {
  constructor({ existingEmails = [], failAfterAccountInsert = false } = {}) {
    this.accounts = new Map(existingEmails.map((email) => [email, { email }]));
    this.roles = [];
    this.consents = [];
    this.failAfterAccountInsert = failAfterAccountInsert;
    this.received = undefined;
  }

  async assertReady({ consents }) {
    const approved = consents.every(
      ({ documentCode, version }) =>
        documentCode === 'terms' && version === 'test-approved-v1',
    );
    if (!approved) throw new Error('Test legal version is not approved');
  }

  async createParticipantTransaction(input) {
    this.received = input;
    const snapshot = {
      accounts: new Map(this.accounts),
      roles: [...this.roles],
      consents: [...this.consents],
    };

    try {
      if (this.accounts.has(input.email)) throw new DuplicateEmailError();

      const accountId = `test-account-${this.accounts.size + 1}`;
      this.accounts.set(input.email, {
        accountId,
        email: input.email,
        passwordHash: input.passwordHash,
        verificationTier: input.initialAccountState.verificationTier,
        emailVerified: input.initialAccountState.emailVerified,
      });

      if (this.failAfterAccountInsert) throw new Error('Injected transaction failure');

      this.roles.push(...input.roles.map((role) => ({ accountId, role })));
      this.consents.push(
        ...input.consents.map((consent) => ({ accountId, ...consent })),
      );

      return {
        accountId,
        status: 'active',
        verificationTier: 0,
        emailVerified: false,
        roles: [...input.roles],
      };
    } catch (error) {
      this.accounts = snapshot.accounts;
      this.roles = snapshot.roles;
      this.consents = snapshot.consents;
      throw error;
    }
  }
}

function buildService(repository) {
  return new RegistrationService({
    passwordHasher: new Argon2PasswordHasher(),
    repository,
  });
}

test('valid participant registration service normalizes email and returns Tier 0', async () => {
  const repository = new TransactionalMemoryRegistrationRepository();
  const result = await buildService(repository).register(VALID_INPUT);

  assert.equal(repository.received.email, 'participant@example.test');
  assert.equal(result.verificationTier, 0);
  assert.equal(result.emailVerified, false);
  assert.deepEqual(result.roles, ['founder']);
});

test('Argon2id hashes the password and plaintext is never sent to the repository', async () => {
  const repository = new TransactionalMemoryRegistrationRepository();
  const hasher = new Argon2PasswordHasher();
  await buildService(repository).register(VALID_INPUT);

  assert.equal('password' in repository.received, false);
  assert.notEqual(repository.received.passwordHash, SYNTHETIC_PASSWORD);
  assert.match(repository.received.passwordHash, /^\$argon2id\$/);
  assert.equal(await hasher.verify(repository.received.passwordHash, SYNTHETIC_PASSWORD), true);
  assert.equal(JSON.stringify(repository.received).includes(SYNTHETIC_PASSWORD), false);
});

test('duplicate email is mapped to a generic safe conflict', async () => {
  const repository = new TransactionalMemoryRegistrationRepository({
    existingEmails: ['participant@example.test'],
  });

  await assert.rejects(buildService(repository).register(VALID_INPUT), (error) => {
    assert.equal(error.status, 409);
    assert.equal(error.code, 'CONFLICT');
    assert.equal(error.message, 'Registration cannot be completed');
    assert.equal(error.message.includes('participant@example.test'), false);
    return true;
  });
});

test('transaction failure rolls back account, role and consent state', async () => {
  const repository = new TransactionalMemoryRegistrationRepository({
    failAfterAccountInsert: true,
  });

  await assert.rejects(
    buildService(repository).register(VALID_INPUT),
    /Injected transaction failure/,
  );
  assert.equal(repository.accounts.size, 0);
  assert.equal(repository.roles.length, 0);
  assert.equal(repository.consents.length, 0);
});

test('unapproved consent version blocks before password hashing or persistence', async () => {
  const repository = new TransactionalMemoryRegistrationRepository();
  let hashCalled = false;
  const service = new RegistrationService({
    repository,
    passwordHasher: {
      async hash() {
        hashCalled = true;
        return 'must-not-be-created';
      },
    },
  });

  await assert.rejects(
    service.register({
      ...VALID_INPUT,
      consents: [{ documentCode: 'terms', version: 'unapproved-version' }],
    }),
    /Test legal version is not approved/,
  );
  assert.equal(hashCalled, false);
  assert.equal(repository.accounts.size, 0);
});
