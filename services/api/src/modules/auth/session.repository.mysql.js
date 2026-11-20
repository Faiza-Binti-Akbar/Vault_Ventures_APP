const crypto = require('node:crypto');

const REQUIRED_SESSION_MIGRATION = '20261120120000_m03_participant_auth_sessions';

class MySqlSessionRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAccountByEmail(email) {
    const [rows] = await this.pool.execute(
      `SELECT id, public_id, email, password_hash, status, verification_tier,
              email_verified_at
         FROM accounts WHERE email = ? LIMIT 1`,
      [email],
    );
    if (!rows[0]) return null;
    const [roleRows] = await this.pool.execute(
      `SELECT role_code FROM account_roles
        WHERE account_id = ? AND removed_at IS NULL ORDER BY id`,
      [rows[0].id],
    );
    return { ...rows[0], roles: roleRows.map(({ role_code }) => role_code) };
  }

  async assertReady() {
    const [rows] = await this.pool.execute(
      'SELECT version FROM schema_migrations WHERE version = ? LIMIT 1',
      [REQUIRED_SESSION_MIGRATION],
    );
    return rows.length === 1;
  }

  async createSession({ accountDbId, refreshTokenHash, expiresAt, deviceLabel }) {
    const sessionId = crypto.randomUUID();
    const familyId = crypto.randomUUID();
    await this.pool.execute(
      `INSERT INTO auth_sessions
         (public_id, family_id, account_id, refresh_token_hash, issued_at,
          expires_at, device_label)
       VALUES (?, ?, ?, ?, UTC_TIMESTAMP(3), ?, ?)`,
      [sessionId, familyId, accountDbId, refreshTokenHash, expiresAt, deviceLabel ?? null],
    );
    await this.pool.execute(
      'UPDATE accounts SET last_login_at = UTC_TIMESTAMP(3) WHERE id = ?',
      [accountDbId],
    );
    return { sessionId, familyId };
  }

  async rotateSession({ refreshTokenHash, nextRefreshTokenHash, expiresAt }) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute(
        `SELECT s.id, s.public_id, s.family_id, s.account_id, s.consumed_at,
                s.revoked_at, s.expires_at, a.public_id AS account_public_id,
                a.email, a.status, a.verification_tier, a.email_verified_at
           FROM auth_sessions s JOIN accounts a ON a.id = s.account_id
          WHERE s.refresh_token_hash = ? LIMIT 1 FOR UPDATE`,
        [refreshTokenHash],
      );
      const row = rows[0];
      if (!row) {
        await connection.rollback();
        return { status: 'invalid' };
      }
      if (row.consumed_at) {
        await connection.execute(
          `UPDATE auth_sessions SET revoked_at = COALESCE(revoked_at, UTC_TIMESTAMP(3)),
                  revoked_reason = COALESCE(revoked_reason, 'refresh_replay')
            WHERE family_id = ?`,
          [row.family_id],
        );
        await connection.commit();
        return { status: 'replayed' };
      }
      if (row.revoked_at || new Date(row.expires_at) <= new Date() || row.status !== 'active') {
        await connection.rollback();
        return { status: row.status !== 'active' ? 'suspended' : 'invalid' };
      }
      const nextSessionId = crypto.randomUUID();
      const [result] = await connection.execute(
        `INSERT INTO auth_sessions
           (public_id, family_id, account_id, refresh_token_hash, issued_at, expires_at, device_label)
         SELECT ?, family_id, account_id, ?, UTC_TIMESTAMP(3), ?, device_label
           FROM auth_sessions WHERE id = ?`,
        [nextSessionId, nextRefreshTokenHash, expiresAt, row.id],
      );
      await connection.execute(
        `UPDATE auth_sessions SET consumed_at = UTC_TIMESTAMP(3), replaced_by_id = ?
          WHERE id = ?`,
        [result.insertId, row.id],
      );
      const [roles] = await connection.execute(
        `SELECT role_code FROM account_roles
          WHERE account_id = ? AND removed_at IS NULL ORDER BY id`,
        [row.account_id],
      );
      await connection.commit();
      return {
        status: 'rotated',
        sessionId: nextSessionId,
        account: {
          public_id: row.account_public_id,
          email: row.email,
          status: row.status,
          verification_tier: row.verification_tier,
          email_verified_at: row.email_verified_at,
          roles: roles.map(({ role_code }) => role_code),
        },
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async findActiveContext(sessionId, accountPublicId) {
    const [rows] = await this.pool.execute(
      `SELECT s.id, a.id AS account_db_id, a.public_id, a.email, a.status,
              a.verification_tier, a.email_verified_at
         FROM auth_sessions s JOIN accounts a ON a.id = s.account_id
        WHERE s.public_id = ? AND a.public_id = ? AND s.revoked_at IS NULL
          AND s.expires_at > UTC_TIMESTAMP(3) LIMIT 1`,
      [sessionId, accountPublicId],
    );
    if (!rows[0]) return null;
    const [roles] = await this.pool.execute(
      `SELECT role_code FROM account_roles
        WHERE account_id = ? AND removed_at IS NULL ORDER BY id`,
      [rows[0].account_db_id],
    );
    return { ...rows[0], roles: roles.map(({ role_code }) => role_code) };
  }

  async revokeSession(sessionId, reason = 'logout') {
    const [result] = await this.pool.execute(
      `UPDATE auth_sessions SET revoked_at = UTC_TIMESTAMP(3), revoked_reason = ?
        WHERE public_id = ? AND revoked_at IS NULL`,
      [reason, sessionId],
    );
    return result.affectedRows > 0;
  }
}

module.exports = { MySqlSessionRepository, REQUIRED_SESSION_MIGRATION };
