-- M01: DB-E007 legal document versions only. No legal content is seeded here.
-- Owner-approved Terms and simulation-disclaimer rows require separate authorization.
CREATE TABLE legal_document_versions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  doc_type VARCHAR(30) NOT NULL,
  version_label VARCHAR(30) NOT NULL,
  body_text MEDIUMTEXT NULL,
  content_sha256 CHAR(64) NULL,
  effective_from DATETIME(3) NOT NULL,
  retired_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  CONSTRAINT uq_legal_document_type_version UNIQUE (doc_type, version_label)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
