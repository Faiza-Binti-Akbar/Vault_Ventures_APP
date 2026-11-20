require('dotenv').config();

const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');

const mysql = require('mysql2/promise');

const MIGRATIONS_DIRECTORY = path.resolve(__dirname, '../../../database/migrations');
const MIGRATION_NAME = /^(\d{14}_[a-z0-9_]+)\.sql$/;
const LOCK_NAME = 'vault_ventures_migrations';

function databaseOptions() {
  const required = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing required database environment variables: ${missing.join(', ')}`);
  }
  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  };
}

async function loadMigrations(directory = MIGRATIONS_DIRECTORY) {
  const names = (await fs.readdir(directory))
    .filter((name) => MIGRATION_NAME.test(name))
    .sort();
  return Promise.all(
    names.map(async (name) => {
      const sql = await fs.readFile(path.join(directory, name), 'utf8');
      return {
        version: name.match(MIGRATION_NAME)[1],
        name,
        sql,
        checksum: crypto.createHash('sha256').update(sql).digest('hex'),
      };
    }),
  );
}

async function runMigrations({ connection, migrations, log = console.log }) {
  await connection.query(
    `CREATE TABLE IF NOT EXISTS schema_migrations (
       version VARCHAR(100) NOT NULL,
       checksum CHAR(64) NOT NULL,
       applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
       PRIMARY KEY (version)
     ) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );

  const [lockRows] = await connection.execute('SELECT GET_LOCK(?, 10) AS acquired', [
    LOCK_NAME,
  ]);
  if (lockRows[0].acquired !== 1) throw new Error('Could not acquire migration lock');

  try {
    for (const migration of migrations) {
      const [rows] = await connection.execute(
        'SELECT checksum FROM schema_migrations WHERE version = ?',
        [migration.version],
      );
      if (rows.length === 1) {
        if (rows[0].checksum !== migration.checksum) {
          throw new Error(`Applied migration checksum mismatch: ${migration.version}`);
        }
        log(`Already applied, not rerun: ${migration.version}`);
        continue;
      }

      // MySQL DDL can cause implicit commits. History is recorded only after the
      // complete trusted migration file succeeds; a partial failure requires review.
      await connection.query(migration.sql);
      await connection.execute(
        'INSERT INTO schema_migrations (version, checksum) VALUES (?, ?)',
        [migration.version, migration.checksum],
      );
      log(`Applied: ${migration.version}`);
    }
  } finally {
    await connection.execute('SELECT RELEASE_LOCK(?)', [LOCK_NAME]);
  }
}

async function main() {
  if (process.env.ALLOW_MIGRATIONS !== 'true') {
    throw new Error(
      'Migration execution is disabled. Set ALLOW_MIGRATIONS=true only after explicit authorization.',
    );
  }
  const connection = await mysql.createConnection(databaseOptions());
  try {
    await runMigrations({ connection, migrations: await loadMigrations() });
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`Migration failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { loadMigrations, runMigrations };
