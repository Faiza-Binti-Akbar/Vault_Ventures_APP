const { RegistrationPersistenceUnavailableError } = require('./registration.errors');
const { DEMO_REQUIRED_CONSENTS } = require('./demo-legal-documents');

const REGISTRATION_PERSISTENCE_BLOCKERS = Object.freeze([
  'reviewed and explicitly applied M01/M02 authentication schema migrations',
  'approved active Terms of Service and simulation disclaimer versions',
]);

class RegistrationRepository {
  async assertReady() {
    throw new Error('RegistrationRepository.assertReady must be implemented');
  }

  async createParticipantTransaction() {
    throw new Error(
      'RegistrationRepository.createParticipantTransaction must be implemented atomically',
    );
  }
}

class DisabledRegistrationRepository extends RegistrationRepository {
  async assertReady() {
    throw new RegistrationPersistenceUnavailableError(
      REGISTRATION_PERSISTENCE_BLOCKERS,
    );
  }

  async createParticipantTransaction() {
    throw new RegistrationPersistenceUnavailableError(
      REGISTRATION_PERSISTENCE_BLOCKERS,
    );
  }
}

function parseRequiredConsents(value) {
  if (typeof value !== 'string' || value.trim() === '') return [];

  return value.split(',').map((entry) => {
    const [documentCode, version, ...extra] = entry.split(':');
    if (
      extra.length > 0 ||
      !documentCode ||
      !version ||
      documentCode.trim() === '' ||
      version.trim() === ''
    ) {
      throw new Error(
        'REGISTRATION_REQUIRED_CONSENTS must use documentCode:version comma-separated entries',
      );
    }
    return { documentCode: documentCode.trim(), version: version.trim() };
  });
}

function createConfiguredRegistrationRepository(environment = process.env) {
  const enabled =
    environment.NODE_ENV === 'development' &&
    environment.REGISTRATION_PERSISTENCE_ENABLED === 'true';
  const requiredConsents = parseRequiredConsents(
    environment.REGISTRATION_REQUIRED_CONSENTS,
  );

  const exactDemoConsentSet =
    requiredConsents.length === DEMO_REQUIRED_CONSENTS.length &&
    DEMO_REQUIRED_CONSENTS.every(({ documentCode, version }) =>
      requiredConsents.some(
        (consent) => consent.documentCode === documentCode && consent.version === version,
      ),
    );

  if (!enabled || !exactDemoConsentSet) {
    return new DisabledRegistrationRepository();
  }

  const integrityCheckedConsents = requiredConsents.map((consent) => ({
    ...consent,
    contentSha256: DEMO_REQUIRED_CONSENTS.find(
      (draft) =>
        draft.documentCode === consent.documentCode && draft.version === consent.version,
    ).contentSha256,
  }));

  // Load database configuration only after the explicit development gate.
  const pool = require('../../config/database');
  const { MySqlRegistrationRepository } = require('./registration.repository.mysql');
  return new MySqlRegistrationRepository({
    pool,
    requiredConsents: integrityCheckedConsents,
  });
}

module.exports = {
  createConfiguredRegistrationRepository,
  DisabledRegistrationRepository,
  parseRequiredConsents,
  REGISTRATION_PERSISTENCE_BLOCKERS,
  RegistrationRepository,
};
