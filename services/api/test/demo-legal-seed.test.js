const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  DEMO_LEGAL_DOCUMENTS,
  sha256,
} = require('../src/modules/auth/demo-legal-documents');
const {
  seedDemoLegalDocuments,
} = require('../scripts/seed-demo-legal-documents');

const authorizedEnvironment = {
  ALLOW_DEMO_LEGAL_SEED: 'true',
  DB_HOST: '127.0.0.1',
  DB_PORT: '3307',
  DB_USER: 'synthetic-test-user',
  DB_PASSWORD: 'synthetic-test-password',
  DB_NAME: 'vault_ventures_mobile',
};

function fakeConnection(existingRows = new Map()) {
  const calls = [];
  const connection = {
    calls,
    async execute(sql, values) {
      calls.push(['execute', sql, values]);
      if (sql.includes('SELECT DATABASE()')) {
        return [[{ database_name: 'vault_ventures_mobile' }], []];
      }
      if (sql.includes('FROM legal_document_versions')) {
        return [existingRows.get(`${values[0]}:${values[1]}`) ?? [], []];
      }
      if (sql.includes('INSERT INTO legal_document_versions')) {
        return [{ affectedRows: 1 }, []];
      }
      throw new Error(`Unexpected SQL: ${sql}`);
    },
    async beginTransaction() { calls.push(['begin']); },
    async commit() { calls.push(['commit']); },
    async rollback() { calls.push(['rollback']); },
    async end() { calls.push(['end']); },
  };
  return connection;
}

test('draft hashes are SHA-256 values calculated from the exact UTF-8 bodies', () => {
  for (const document of DEMO_LEGAL_DOCUMENTS) {
    assert.equal(document.contentSha256, sha256(document.body));
    assert.match(document.contentSha256, /^[a-f0-9]{64}$/);
  }
});

test('seed refuses before opening a connection without process-local authorization', async () => {
  let connected = false;
  await assert.rejects(
    seedDemoLegalDocuments({
      environment: { ...authorizedEnvironment, ALLOW_DEMO_LEGAL_SEED: undefined },
      connect: async () => { connected = true; },
    }),
    /explicit process-local ALLOW_DEMO_LEGAL_SEED=true/i,
  );
  assert.equal(connected, false);
});

test('seed rejects a database target other than the isolated local demo database', async () => {
  let connected = false;
  await assert.rejects(
    seedDemoLegalDocuments({
      environment: { ...authorizedEnvironment, DB_NAME: 'vault_ventures' },
      connect: async () => { connected = true; },
    }),
    /target must be 127\.0\.0\.1:3307\/vault_ventures_mobile/,
  );
  assert.equal(connected, false);
});

test('seed inserts exact document bodies and hashes in one transaction', async () => {
  const connection = fakeConnection();
  const results = await seedDemoLegalDocuments({
    environment: authorizedEnvironment,
    connect: async () => connection,
  });

  assert.deepEqual(results.map(({ action }) => action), ['inserted', 'inserted']);
  const inserts = connection.calls.filter(
    ([kind, sql]) => kind === 'execute' && sql.includes('INSERT INTO legal_document_versions'),
  );
  assert.equal(inserts.length, 2);
  assert.deepEqual(inserts[0][2], [
    DEMO_LEGAL_DOCUMENTS[0].documentCode,
    DEMO_LEGAL_DOCUMENTS[0].version,
    DEMO_LEGAL_DOCUMENTS[0].body,
    DEMO_LEGAL_DOCUMENTS[0].contentSha256,
    DEMO_LEGAL_DOCUMENTS[0].effectiveFrom,
  ]);
  assert.ok(connection.calls.some(([kind]) => kind === 'commit'));
});

test('seed is idempotent when every existing version exactly matches', async () => {
  const rows = new Map(
    DEMO_LEGAL_DOCUMENTS.map((document) => [
      `${document.documentCode}:${document.version}`,
      [{
        body_text: document.body,
        content_sha256: document.contentSha256,
        effective_from_text: `${document.effectiveFrom}000`,
        retired_at: null,
      }],
    ]),
  );
  const connection = fakeConnection(rows);
  const results = await seedDemoLegalDocuments({
    environment: authorizedEnvironment,
    connect: async () => connection,
  });

  assert.deepEqual(results.map(({ action }) => action), ['unchanged', 'unchanged']);
  assert.equal(
    connection.calls.some(
      ([kind, sql]) => kind === 'execute' && sql.includes('INSERT INTO legal_document_versions'),
    ),
    false,
  );
});

test('seed rejects a body/hash conflict and never overwrites the version', async () => {
  const first = DEMO_LEGAL_DOCUMENTS[0];
  const rows = new Map([[
    `${first.documentCode}:${first.version}`,
    [{
      body_text: 'different body',
      content_sha256: sha256('different body'),
      effective_from_text: `${first.effectiveFrom}000`,
      retired_at: null,
    }],
  ]]);
  const connection = fakeConnection(rows);

  await assert.rejects(
    seedDemoLegalDocuments({
      environment: authorizedEnvironment,
      connect: async () => connection,
    }),
    /Legal version conflict/,
  );
  assert.ok(connection.calls.some(([kind]) => kind === 'rollback'));
  assert.equal(
    connection.calls.some(
      ([kind, sql]) =>
        kind === 'execute' && /^(UPDATE|DELETE)\b/i.test(sql.trim()),
    ),
    false,
  );
});
