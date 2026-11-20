const assert = require('node:assert/strict');
const { test } = require('node:test');

process.env.JWT_ACCESS_SECRET = 'test-only-signing-secret-at-least-32-bytes';

const { createParticipantAuth } = require('../src/middleware/participant-auth');
const { signAccessToken } = require('../src/modules/auth/session-token');
const { MySqlSessionRepository } = require('../src/modules/auth/session.repository.mysql');

function request(token) {
  return { get: (name) => name === 'authorization' ? `Bearer ${token}` : undefined };
}

async function invoke(repository, token) {
  const req = request(token);
  let forwarded;
  await createParticipantAuth(repository)(req, {}, (error) => { forwarded = error ?? null; });
  return { req, forwarded };
}

test('protected participant context is loaded server-side for an active session', async () => {
  const participant = { public_id: 'account-id', status: 'active', roles: ['founder'] };
  const repository = {
    findActiveContext: async (sessionId, accountId) => {
      assert.equal(sessionId, 'session-id');
      assert.equal(accountId, 'account-id');
      return participant;
    },
  };
  const result = await invoke(repository, signAccessToken({ accountId: 'account-id', sessionId: 'session-id' }));
  assert.equal(result.forwarded, null);
  assert.equal(result.req.auth.participant, participant);
});

test('revoked session is rejected by a protected endpoint', async () => {
  const repository = { findActiveContext: async () => null };
  const result = await invoke(repository, signAccessToken({ accountId: 'account-id', sessionId: 'revoked-id' }));
  assert.equal(result.forwarded.code, 'SESSION_INVALID');
});

test('mutable suspension status is rechecked and the session is revoked', async () => {
  let revoked;
  const repository = {
    findActiveContext: async () => ({ public_id: 'account-id', status: 'suspended' }),
    revokeSession: async (sessionId, reason) => { revoked = { sessionId, reason }; },
  };
  const result = await invoke(repository, signAccessToken({ accountId: 'account-id', sessionId: 'session-id' }));
  assert.equal(result.forwarded.code, 'ACCOUNT_SUSPENDED');
  assert.deepEqual(revoked, { sessionId: 'session-id', reason: 'account_suspended' });
});

test('logout revocation targets only the current session public id', async () => {
  let statement;
  let values;
  const repository = new MySqlSessionRepository({
    execute: async (sql, parameters) => {
      statement = sql;
      values = parameters;
      return [{ affectedRows: 1 }];
    },
  });
  assert.equal(await repository.revokeSession('current-session-id'), true);
  assert.match(statement, /WHERE public_id = \? AND revoked_at IS NULL/);
  assert.deepEqual(values, ['logout', 'current-session-id']);
});
