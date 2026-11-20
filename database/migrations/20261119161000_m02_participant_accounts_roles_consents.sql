-- M02 participant-only subset: DB-E001, DB-E002 and DB-E008.
-- display_name is nullable in this development migration because AUTH-001 defines
-- registration details as email/password and AUTH-002 permits profile completion later.
CREATE TABLE accounts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  email VARCHAR(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NULL,
  email_verified_at DATETIME(3) NULL,
  phone_e164 VARCHAR(20) NULL,
  phone_verified_at DATETIME(3) NULL,
  verification_tier TINYINT UNSIGNED NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  suspended_at DATETIME(3) NULL,
  last_login_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  CONSTRAINT uq_accounts_public_id UNIQUE (public_id),
  CONSTRAINT uq_accounts_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE account_roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  account_id BIGINT UNSIGNED NOT NULL,
  role_code VARCHAR(20) NOT NULL,
  enrolled_at DATETIME(3) NOT NULL,
  removed_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  CONSTRAINT uq_account_roles_account_role UNIQUE (account_id, role_code),
  CONSTRAINT fk_account_roles_account
    FOREIGN KEY (account_id) REFERENCES accounts (id)
    ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE consent_records (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  account_id BIGINT UNSIGNED NOT NULL,
  legal_document_version_id BIGINT UNSIGNED NOT NULL,
  accepted_at DATETIME(3) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  CONSTRAINT uq_consent_account_document
    UNIQUE (account_id, legal_document_version_id),
  CONSTRAINT fk_consent_account
    FOREIGN KEY (account_id) REFERENCES accounts (id)
    ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT fk_consent_legal_document
    FOREIGN KEY (legal_document_version_id) REFERENCES legal_document_versions (id)
    ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
