const assert = require('node:assert/strict');
const { test } = require('node:test');

const { DuplicateEmailError } = require('../src/modules/auth/registration.errors');
const {
  MySqlRegistrationRepository,
  REQUIRED_MIGRATIONS,
} = require('../src/modules/auth/registration.repository.mysql');

const requiredConsents = [
  { documentCode: 'owner-terms-code', version: 'owner-terms-version' },
  { documentCode: 'owner-simulation-code', version: 'owner-simulation-version' },
];

function readyPool() {
  return {
    async execute(sql) {
      if (sql.includes('FROM schema_migrations')) {
        return [REQUIRED_MIGRATIONS.map((version) => ({ version })), []];
      }
      if (sql.includes('FROM legal_document_versions')) return [[{ id: 10 }], []];
      throw new Error(`Unexpected readiness query: ${sql}`);
    },
  };
}

function transactionalPool({ duplicateEmail = false, failOnConsentInsert = false } = {}) {
  const calls = [];
  const connection = {
    calls,
    async beginTransaction() {
      calls.push(['begin']);
    },
    async execute(sql, values) {
      calls.push(['execute', sql, values]);
      if (sql.includes('INSERT INTO accounts')) {
        if (duplicateEmail) {
          const error = new Error("Duplicate entry for key 'uq_accounts_email'");
          error.code = 'ER_DUP_ENTRY';
          throw error;
        }
        return [{ insertId: 42 }, []];
      }
      if (sql.includes('FROM legal_document_versions')) return [[{ id: 9 }], []];
      if (sql.includes('INSERT INTO consent_records') && failOnConsentInsert) {
        throw new Error('Injected consent insert failure');
      }
      return [{ affectedRows: 1 }, []];
    },
    async commit() {
      calls.push(['commit']);
    },
    async rollback() {
      calls.push(['rollback']);
    },
    release() {
      calls.push(['release']);
    },
  };
  return { connection, pool: { async getConnection() { return connection; } } };
}

const registrationInput = {
  email: 'participant@example.test',
  passwordHash: '$argon2id$synthetic-hash',
  roles: ['founder', 'investor'],
  consents: requiredConsents,
  initialAccountState: { verificationTier: 0, emailVerified: false },
};

test('repository readiness requires both tracked migrations and active legal versions', async () => {
  const repository = new MySqlRegistrationRepository({
    pool: readyPool(),
    requiredConsents,
  });
  await repository.assertReady({ consents: requiredConsents });
});

test('repository rejects an incomplete required consent set before writes', async () => {
  const repository = new MySqlRegistrationRepository({
    pool: readyPool(),
    requiredConsents,
  });
  await assert.rejects(
    repository.assertReady({ consents: [requiredConsents[0]] }),
    (error) => error.name === 'RegistrationPersistenceUnavailableError',
  );
});

test('repository rejects a missing or inactive required legal version', async () => {
  const pool = {
    async execute(sql) {
      if (sql.includes('FROM schema_migrations')) {
        return [REQUIRED_MIGRATIONS.map((version) => ({ version })), []];
      }
      if (sql.includes('FROM legal_document_versions')) return [[], []];
      throw new Error(`Unexpected readiness query: ${sql}`);
    },
  };
  const repository = new MySqlRegistrationRepository({ pool, requiredConsents });
  await assert.rejects(
    repository.assertReady({ consents: requiredConsents }),
    (error) => error.name === 'RegistrationPersistenceUnavailableError',
  );
});

test('repository rejects a legal document whose stored hash differs from the reviewed draft', async () => {
  const integrityConsents = requiredConsents.map((consent) => ({
    ...consent,
    contentSha256: 'a'.repeat(64),
  }));
  const repository = new MySqlRegistrationRepository({
    pool: readyPool(),
    requiredConsents: integrityConsents,
  });
  await assert.rejects(
    repository.assertReady({ consents: requiredConsents }),
    (error) => error.name === 'RegistrationPersistenceUnavailableError',
  );
});

test('repository uses prepared statements and commits account, roles and consents atomically', async () => {
  const { connection, pool } = transactionalPool();
  const repository = new MySqlRegistrationRepository({ pool, requiredConsents });
  const result = await repository.createParticipantTransaction(registrationInput);

  assert.equal(result.verificationTier, 0);
  assert.equal(result.emailVerified, false);
  assert.equal(connection.calls[0][0], 'begin');
  assert.ok(connection.calls.some(([kind]) => kind === 'commit'));
  assert.equal(connection.calls.some(([kind]) => kind === 'rollback'), false);
  assert.equal(connection.calls.at(-1)[0], 'release');

  const accountInsert = connection.calls.find(
    ([kind, sql]) => kind === 'execute' && sql.includes('INSERT INTO accounts'),
  );
  assert.deepEqual(accountInsert[2].slice(1), [
    'participant@example.test',
    '$argon2id$synthetic-hash',
  ]);
  assert.equal(JSON.stringify(connection.calls).includes('plaintext'), false);
});

test('repository rejects additional or duplicate consent entries', async () => {
  const repository = new MySqlRegistrationRepository({
    pool: readyPool(),
    requiredConsents,
  });
  await assert.rejects(
    repository.assertReady({
      consents: [...requiredConsents, { documentCode: 'extra', version: '1' }],
    }),
    (error) => error.name === 'RegistrationPersistenceUnavailableError',
  );
  await assert.rejects(
    repository.assertReady({
      consents: [requiredConsents[0], requiredConsents[0], requiredConsents[1]],
    }),
    (error) => error.name === 'RegistrationPersistenceUnavailableError',
  );
});

test('repository rolls back all writes when a consent insert fails', async () => {
  const { connection, pool } = transactionalPool({ failOnConsentInsert: true });
  const repository = new MySqlRegistrationRepository({ pool, requiredConsents });

  await assert.rejects(
    repository.createParticipantTransaction(registrationInput),
    /Injected consent insert failure/,
  );
  assert.ok(connection.calls.some(([kind]) => kind === 'rollback'));
  assert.equal(connection.calls.some(([kind]) => kind === 'commit'), false);
  assert.equal(connection.calls.at(-1)[0], 'release');
});

test('duplicate email is rolled back and converted to DuplicateEmailError', async () => {
  const { connection, pool } = transactionalPool({ duplicateEmail: true });
  const repository = new MySqlRegistrationRepository({ pool, requiredConsents });

  await assert.rejects(
    repository.createParticipantTransaction(registrationInput),
    DuplicateEmailError,
  );
  assert.ok(connection.calls.some(([kind]) => kind === 'rollback'));
  assert.equal(connection.calls.at(-1)[0], 'release');
});
