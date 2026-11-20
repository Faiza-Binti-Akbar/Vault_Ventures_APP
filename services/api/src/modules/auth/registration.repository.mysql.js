const crypto = require('node:crypto');

const {
  DuplicateEmailError,
  RegistrationPersistenceUnavailableError,
} = require('./registration.errors');
const { RegistrationRepository } = require('./registration.repository');

const REQUIRED_MIGRATIONS = Object.freeze([
  '20261119160000_m01_legal_document_versions',
  '20261119161000_m02_participant_accounts_roles_consents',
]);

class MySqlRegistrationRepository extends RegistrationRepository {
  constructor({ pool, requiredConsents }) {
    super();
    this.pool = pool;
    this.requiredConsents = requiredConsents;
  }

  async assertReady({ consents }) {
    const [migrationRows] = await this.pool.execute(
      `SELECT version
         FROM schema_migrations
        WHERE version IN (?, ?)`,
      REQUIRED_MIGRATIONS,
    );
    const applied = new Set(migrationRows.map(({ version }) => version));
    if (REQUIRED_MIGRATIONS.some((version) => !applied.has(version))) {
      throw new RegistrationPersistenceUnavailableError([
        'reviewed and explicitly applied M01/M02 authentication schema migrations',
      ]);
    }

    const submitted = new Set(
      consents.map(({ documentCode, version }) => `${documentCode}:${version}`),
    );
    const invalidConsentSet =
      submitted.size !== consents.length ||
      submitted.size !== this.requiredConsents.length ||
      this.requiredConsents.some(
      ({ documentCode, version }) => !submitted.has(`${documentCode}:${version}`),
      );
    if (invalidConsentSet) {
      throw new RegistrationPersistenceUnavailableError([
        'the complete owner-approved Terms and simulation disclaimer consent set',
      ]);
    }

    for (const { documentCode, version } of this.requiredConsents) {
      const [legalRows] = await this.pool.execute(
        `SELECT id, content_sha256
           FROM legal_document_versions
          WHERE doc_type = ?
            AND version_label = ?
            AND body_text IS NOT NULL
            AND content_sha256 IS NOT NULL
            AND effective_from <= UTC_TIMESTAMP(3)
            AND retired_at IS NULL
          LIMIT 1`,
        [documentCode, version],
      );
      if (
        legalRows.length !== 1 ||
        (this.requiredConsents.find(
          (consent) =>
            consent.documentCode === documentCode && consent.version === version,
        ).contentSha256 &&
          legalRows[0].content_sha256 !==
            this.requiredConsents.find(
              (consent) =>
                consent.documentCode === documentCode && consent.version === version,
            ).contentSha256)
      ) {
        throw new RegistrationPersistenceUnavailableError([
          'approved active Terms of Service and simulation disclaimer versions',
        ]);
      }
    }
  }

  async createParticipantTransaction(input) {
    const connection = await this.pool.getConnection();
    const publicId = crypto.randomUUID();

    try {
      await connection.beginTransaction();
      const [accountResult] = await connection.execute(
        `INSERT INTO accounts
           (public_id, email, password_hash, display_name,
            email_verified_at, verification_tier, status)
         VALUES (?, ?, ?, NULL, NULL, 0, 'active')`,
        [publicId, input.email, input.passwordHash],
      );

      for (const role of input.roles) {
        await connection.execute(
          `INSERT INTO account_roles (account_id, role_code, enrolled_at)
           VALUES (?, ?, UTC_TIMESTAMP(3))`,
          [accountResult.insertId, role],
        );
      }

      for (const consent of input.consents) {
        const [legalRows] = await connection.execute(
          `SELECT id, content_sha256
             FROM legal_document_versions
            WHERE doc_type = ?
              AND version_label = ?
              AND body_text IS NOT NULL
              AND content_sha256 IS NOT NULL
              AND effective_from <= UTC_TIMESTAMP(3)
              AND retired_at IS NULL
            LIMIT 1
            FOR UPDATE`,
          [consent.documentCode, consent.version],
        );
        const requiredConsent = this.requiredConsents.find(
          (item) =>
            item.documentCode === consent.documentCode && item.version === consent.version,
        );
        if (
          legalRows.length !== 1 ||
          (requiredConsent?.contentSha256 &&
            legalRows[0].content_sha256 !== requiredConsent.contentSha256)
        ) {
          throw new RegistrationPersistenceUnavailableError([
            'approved active legal document versions remained valid during registration',
          ]);
        }
        await connection.execute(
          `INSERT INTO consent_records
             (account_id, legal_document_version_id, accepted_at)
           VALUES (?, ?, UTC_TIMESTAMP(3))`,
          [accountResult.insertId, legalRows[0].id],
        );
      }

      await connection.commit();
      return {
        accountId: publicId,
        status: 'active',
        verificationTier: 0,
        emailVerified: false,
        roles: [...input.roles],
      };
    } catch (error) {
      await connection.rollback();
      if (
        error.code === 'ER_DUP_ENTRY' &&
        String(error.message).includes('uq_accounts_email')
      ) {
        throw new DuplicateEmailError();
      }
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = { MySqlRegistrationRepository, REQUIRED_MIGRATIONS };
