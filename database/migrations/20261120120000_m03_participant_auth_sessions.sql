-- M03 is prepared for Phase 2 Step 2.6 but must not be executed without the
-- owner's explicit database-write authorization. It implements the provisional
-- non-production DB-E005 alternative A for participant accounts only.

CREATE TABLE auth_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  family_id CHAR(36) NOT NULL,
  account_id BIGINT UNSIGNED NOT NULL,
  refresh_token_hash CHAR(64) NOT NULL,
  issued_at DATETIME(3) NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  consumed_at DATETIME(3) NULL,
  replaced_by_id BIGINT UNSIGNED NULL,
  revoked_at DATETIME(3) NULL,
  revoked_reason VARCHAR(40) NULL,
  device_label VARCHAR(80) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_auth_sessions_public_id (public_id),
  UNIQUE KEY uq_auth_sessions_refresh_token_hash (refresh_token_hash),
  KEY ix_auth_sessions_family_id (family_id),
  KEY ix_auth_sessions_account_active (account_id, revoked_at, expires_at),
  CONSTRAINT fk_auth_sessions_account
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE RESTRICT,
  CONSTRAINT fk_auth_sessions_replaced_by
    FOREIGN KEY (replaced_by_id) REFERENCES auth_sessions (id) ON DELETE SET NULL,
  CONSTRAINT ck_auth_sessions_hash_length
    CHECK (CHAR_LENGTH(refresh_token_hash) = 64)
) ENGINE=InnoDB;
