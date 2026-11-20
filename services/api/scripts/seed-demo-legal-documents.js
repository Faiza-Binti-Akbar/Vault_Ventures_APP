const mysql = require('mysql2/promise');
const {
  DEMO_LEGAL_DOCUMENTS,
} = require('../src/modules/auth/demo-legal-documents');

const EXPECTED_TARGET = Object.freeze({
  host: '127.0.0.1',
  port: 3307,
  database: 'vault_ventures_mobile',
});

function assertAuthorized(environment) {
  if (environment.ALLOW_DEMO_LEGAL_SEED !== 'true') {
    throw new Error(
      'Demo legal seed is disabled. Explicit process-local ALLOW_DEMO_LEGAL_SEED=true is required.',
    );
  }
}

function databaseConfig(environment) {
  const config = {
    host: environment.DB_HOST,
    port: Number(environment.DB_PORT),
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: environment.DB_NAME,
  };
  if (
    config.host !== EXPECTED_TARGET.host ||
    config.port !== EXPECTED_TARGET.port ||
    config.database !== EXPECTED_TARGET.database
  ) {
    throw new Error(
      'Refusing demo legal seed: target must be 127.0.0.1:3307/vault_ventures_mobile.',
    );
  }
  return config;
}

function existingDocumentMatches(existing, document) {
  return (
    existing.body_text === document.body &&
    existing.content_sha256 === document.contentSha256 &&
    existing.effective_from_text === document.effectiveFrom &&
    existing.retired_at === null
  );
}

async function seedDemoLegalDocuments({ environment = process.env, connect = mysql.createConnection } = {}) {
  assertAuthorized(environment);
  const config = databaseConfig(environment);
  const connection = await connect(config);
  const results = [];

  try {
    const [[target]] = await connection.execute('SELECT DATABASE() AS database_name');
    if (target?.database_name !== EXPECTED_TARGET.database) {
      throw new Error('Refusing demo legal seed: connected database does not match the authorized target.');
    }

    await connection.beginTransaction();
    for (const document of DEMO_LEGAL_DOCUMENTS) {
      const [rows] = await connection.execute(
        `SELECT body_text, content_sha256,
                DATE_FORMAT(effective_from, '%Y-%m-%d %H:%i:%s.%f') AS effective_from_text,
                retired_at
           FROM legal_document_versions
          WHERE doc_type = ? AND version_label = ?
          FOR UPDATE`,
        [document.documentCode, document.version],
      );

      if (rows.length > 1) {
        throw new Error(`Conflicting duplicate legal version: ${document.documentCode}:${document.version}`);
      }
      if (rows.length === 1) {
        const normalized = {
          ...rows[0],
          effective_from_text: String(rows[0].effective_from_text).slice(0, 23),
        };
        if (!existingDocumentMatches(normalized, document)) {
          throw new Error(`Legal version conflict: ${document.documentCode}:${document.version}`);
        }
        results.push({ documentCode: document.documentCode, version: document.version, action: 'unchanged' });
        continue;
      }

      await connection.execute(
        `INSERT INTO legal_document_versions
           (doc_type, version_label, body_text, content_sha256, effective_from, retired_at)
         VALUES (?, ?, ?, ?, ?, NULL)`,
        [
          document.documentCode,
          document.version,
          document.body,
          document.contentSha256,
          document.effectiveFrom,
        ],
      );
      results.push({ documentCode: document.documentCode, version: document.version, action: 'inserted' });
    }
    await connection.commit();
    return results;
  } catch (error) {
    if (typeof connection.rollback === 'function') await connection.rollback();
    throw error;
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  require('dotenv').config();
  seedDemoLegalDocuments()
    .then((results) => {
      for (const result of results) {
        console.log(`${result.documentCode}:${result.version} ${result.action}`);
      }
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  EXPECTED_TARGET,
  assertAuthorized,
  databaseConfig,
  existingDocumentMatches,
  seedDemoLegalDocuments,
};
