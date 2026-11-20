const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');

// Endpoint contract tests must never inherit the developer's live persistence gate.
process.env.NODE_ENV = 'test';
process.env.REGISTRATION_PERSISTENCE_ENABLED = 'false';
process.env.REGISTRATION_REQUIRED_CONSENTS = '';
process.env.SESSION_PERSISTENCE_ENABLED = 'false';
process.env.JWT_ACCESS_SECRET = 'test-only-signing-secret-at-least-32-bytes';

const app = require('../src/app');

let baseUrl;
let server;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

async function post(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return { response, payload: await response.json() };
}

function assertValidationError(result, field) {
  assert.equal(result.response.status, 400);
  assert.equal(result.payload.error.code, 'VALIDATION_FAILED');
  assert.equal(result.payload.error.message, 'Request validation failed');
  assert.ok(result.payload.error.fields.some((item) => item.field === field));
  assert.match(result.payload.meta.requestId, /^req_/);
}

function assertNotImplemented(result) {
  assert.equal(result.response.status, 501);
  assert.equal(result.payload.error.code, 'FEATURE_NOT_ENABLED');
  assert.deepEqual(result.payload.error.fields, []);
  assert.match(result.payload.meta.requestId, /^req_/);
  assert.equal('data' in result.payload, false);
  assert.equal(JSON.stringify(result.payload).toLowerCase().includes('token'), false);
}

test('existing health endpoint remains functional', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    success: true,
    message: 'Vault Ventures API is running',
  });
});

test('valid registration reaches the not-implemented boundary', async () => {
  const result = await post('/api/v1/auth/register', {
    email: 'participant@example.test',
    password: 'synthetic-test-value',
    roles: ['founder'],
    consents: [{ documentCode: 'synthetic-terms', version: 'test-version' }],
  });
  assertNotImplemented(result);
  assert.equal(
    result.payload.error.message,
    'Participant registration persistence is disabled pending approved schema migrations and legal document versions',
  );
});

test('valid login fails closed until the reviewed session migration is enabled', async () => {
  const result = await post('/api/v1/auth/login', {
    email: 'participant@example.test',
    password: 'synthetic-test-value',
  });
  assert.equal(result.response.status, 503);
  assert.equal(result.payload.error.code, 'AUTH_SESSION_SCHEMA_REQUIRED');
  assert.equal(JSON.stringify(result.payload).includes('accessToken'), false);
});

test('logout requires a participant access credential', async () => {
  const result = await post('/api/v1/auth/logout', {});
  assert.equal(result.response.status, 401);
  assert.equal(result.payload.error.code, 'AUTHENTICATION_REQUIRED');
});

test('refresh validates the provisional extension payload', async () => {
  const result = await post('/api/v1/auth/refresh', { refreshToken: 'short' });
  assertValidationError(result, 'refreshToken');
});

test('registration rejects a missing email', async () => {
  const result = await post('/api/v1/auth/register', {
    password: 'synthetic-test-value',
    roles: ['investor'],
    consents: [{ documentCode: 'synthetic-terms', version: 'test-version' }],
  });
  assertValidationError(result, 'email');
});

test('login rejects an invalid email format', async () => {
  const result = await post('/api/v1/auth/login', {
    email: 'not-an-email',
    password: 'synthetic-test-value',
  });
  assertValidationError(result, 'email');
});

test('login rejects a missing password', async () => {
  const result = await post('/api/v1/auth/login', {
    email: 'participant@example.test',
  });
  assertValidationError(result, 'password');
});

test('registration rejects invalid participant roles', async () => {
  const result = await post('/api/v1/auth/register', {
    email: 'participant@example.test',
    password: 'synthetic-test-value',
    roles: ['viewer'],
    consents: [{ documentCode: 'synthetic-terms', version: 'test-version' }],
  });
  assertValidationError(result, 'roles[0]');
});

for (const prohibitedRole of ['admin', 'deal_manager']) {
  test(`registration rejects prohibited ${prohibitedRole} role`, async () => {
    const result = await post('/api/v1/auth/register', {
      email: 'participant@example.test',
      password: 'synthetic-test-value',
      roles: [prohibitedRole],
      consents: [{ documentCode: 'synthetic-terms', version: 'test-version' }],
    });
    assertValidationError(result, 'roles[0]');
  });
}

test('registration rejects an invalid consent payload', async () => {
  const result = await post('/api/v1/auth/register', {
    email: 'participant@example.test',
    password: 'synthetic-test-value',
    roles: ['professional'],
    consents: [{ documentCode: 'synthetic-terms' }],
  });
  assertValidationError(result, 'consents[0].version');
});

test('registration rejects invalid field types', async () => {
  const result = await post('/api/v1/auth/register', {
    email: 42,
    password: false,
    roles: 'founder',
    consents: {},
  });
  assertValidationError(result, 'email');
  assert.ok(result.payload.error.fields.some((item) => item.field === 'password'));
  assert.ok(result.payload.error.fields.some((item) => item.field === 'roles'));
  assert.ok(result.payload.error.fields.some((item) => item.field === 'consents'));
});

test('auth boundary never loads the database module', async () => {
  await post('/api/v1/auth/register', {
    email: 'participant@example.test',
    password: 'synthetic-test-value',
    roles: ['founder'],
    consents: [{ documentCode: 'synthetic-terms', version: 'test-version' }],
  });

  const databasePath = require.resolve('../src/config/database');
  assert.equal(require.cache[databasePath], undefined);
});
