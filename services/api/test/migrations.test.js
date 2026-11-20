const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');

const { loadMigrations, runMigrations } = require('../scripts/run-migrations');

const migrationDirectory = path.resolve(__dirname, '../../../database/migrations');

function migrationConnection() {
  const applied = new Map();
  const migrationSql = [];
  return {
    applied,
    migrationSql,
    async query(sql) {
      if (!sql.includes('CREATE TABLE IF NOT EXISTS schema_migrations')) {
        migrationSql.push(sql);
      }
      return [[], []];
    },
    async execute(sql, values) {
      if (sql.includes('GET_LOCK')) return [[{ acquired: 1 }], []];
      if (sql.includes('RELEASE_LOCK')) return [[{ released: 1 }], []];
      if (sql.includes('SELECT checksum')) {
        const checksum = applied.get(values[0]);
        return [checksum ? [{ checksum }] : [], []];
      }
      if (sql.includes('INSERT INTO schema_migrations')) {
        applied.set(values[0], values[1]);
        return [{ affectedRows: 1 }, []];
      }
      throw new Error(`Unexpected migration query: ${sql}`);
    },
  };
}

test('M01/M02/M03 migration files load in immutable version order without legal seeds', async () => {
  const migrations = await loadMigrations(migrationDirectory);
  assert.deepEqual(
    migrations.map(({ version }) => version),
    [
      '20261119160000_m01_legal_document_versions',
      '20261119161000_m02_participant_accounts_roles_consents',
      '20261120120000_m03_participant_auth_sessions',
    ],
  );
  assert.match(migrations[0].sql, /CREATE TABLE legal_document_versions/);
  assert.doesNotMatch(migrations[0].sql, /INSERT\s+INTO\s+legal_document_versions/i);
  assert.match(migrations[1].sql, /CONSTRAINT uq_accounts_email UNIQUE \(email\)/);
  assert.match(migrations[1].sql, /display_name VARCHAR\(120\) NULL/);
  assert.match(migrations[2].sql, /CREATE TABLE auth_sessions/);
});

test('migration history prevents silent reruns', async () => {
  const connection = migrationConnection();
  const migrations = await loadMigrations(migrationDirectory);
  const logs = [];

  await runMigrations({ connection, migrations, log: (message) => logs.push(message) });
  assert.equal(connection.migrationSql.length, 3);
  assert.equal(connection.applied.size, 3);

  await runMigrations({ connection, migrations, log: (message) => logs.push(message) });
  assert.equal(connection.migrationSql.length, 3);
  assert.equal(logs.filter((message) => message.startsWith('Already applied')).length, 3);
});

test('changed checksum for an applied migration fails closed', async () => {
  const connection = migrationConnection();
  const [migration] = await loadMigrations(migrationDirectory);
  connection.applied.set(migration.version, 'different-checksum');

  await assert.rejects(
    runMigrations({ connection, migrations: [migration], log: () => {} }),
    /Applied migration checksum mismatch/,
  );
  assert.equal(connection.migrationSql.length, 0);
});
