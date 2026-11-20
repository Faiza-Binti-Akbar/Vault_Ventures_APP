const assert = require('node:assert/strict');
const { test } = require('node:test');

process.env.JWT_ACCESS_SECRET = 'test-only-signing-secret-at-least-32-bytes';

const { Argon2PasswordHasher } = require('../src/modules/auth/password-hasher');
const { SessionService } = require('../src/modules/auth/session.service');
const { hashRefreshToken, verifyAccessToken } = require('../src/modules/auth/session-token');

const PASSWORD = 'synthetic-session-password';

async function fixture({ status = 'active' } = {}) {
  const hasher = new Argon2PasswordHasher();
  const account = {
    id: 7,
    public_id: 'account-public-id',
    email: 'participant@example.test',
    password_hash: await hasher.hash(PASSWORD),
    status,
    verification_tier: 0,
    email_verified_at: null,
    roles: ['founder'],
  };
  const repository = {
    created: undefined,
    rotation: undefined,
    assertReady: async () => true,
    findAccountByEmail: async (email) => email === account.email ? account : null,
    createSession: async (input) => {
      repository.created = input;
      return { sessionId: 'session-public-id', familyId: 'family-id' };
    },
    rotateSession: async (input) => {
      repository.rotation = input;
      return { status: 'rotated', sessionId: 'rotated-session-id', account };
    },
  };
  return { repository, service: new SessionService({ passwordHasher: hasher, repository }) };
}

test('login normalizes email, verifies Argon2id and issues a 15-minute access token', async () => {
  const { repository, service } = await fixture();
  const result = await service.login({
    email: ' Participant@Example.TEST ', password: PASSWORD, deviceLabel: 'test-device',
  });
  assert.equal(result.expiresIn, 900);
  assert.equal(result.account.accountId, 'account-public-id');
  assert.equal(repository.created.deviceLabel, 'test-device');
  assert.equal(repository.created.refreshTokenHash, hashRefreshToken(result.refreshToken));
  assert.equal(JSON.stringify(repository.created).includes(result.refreshToken), false);
  assert.equal(verifyAccessToken(result.accessToken).sid, 'session-public-id');
});

test('unknown email and incorrect password return the same generic error', async () => {
  const { service } = await fixture();
  for (const input of [
    { email: 'unknown@example.test', password: PASSWORD },
    { email: 'participant@example.test', password: 'wrong-password' },
  ]) {
    await assert.rejects(service.login(input), (error) => {
      assert.equal(error.status, 401);
      assert.equal(error.code, 'INVALID_CREDENTIALS');
      assert.equal(error.message, 'Email or password is incorrect');
      return true;
    });
  }
});

test('suspended participant cannot create a session', async () => {
  const { repository, service } = await fixture({ status: 'suspended' });
  await assert.rejects(
    service.login({ email: 'participant@example.test', password: PASSWORD }),
    (error) => error.code === 'ACCOUNT_SUSPENDED',
  );
  assert.equal(repository.created, undefined);
});

test('refresh rotates an opaque credential and only passes hashes to persistence', async () => {
  const { repository, service } = await fixture();
  const oldToken = 'old-refresh-token-with-sufficient-entropy-value';
  const result = await service.refresh({ refreshToken: oldToken });
  assert.notEqual(result.refreshToken, oldToken);
  assert.equal(repository.rotation.refreshTokenHash, hashRefreshToken(oldToken));
  assert.equal(repository.rotation.nextRefreshTokenHash, hashRefreshToken(result.refreshToken));
  assert.equal(JSON.stringify(repository.rotation).includes(oldToken), false);
  assert.equal(verifyAccessToken(result.accessToken).sid, 'rotated-session-id');
});

test('replayed or revoked refresh credential is rejected', async () => {
  const { repository, service } = await fixture();
  repository.rotateSession = async () => ({ status: 'replayed' });
  await assert.rejects(
    service.refresh({ refreshToken: 'replayed-refresh-token-with-sufficient-value' }),
    (error) => error.code === 'SESSION_INVALID',
  );
});
