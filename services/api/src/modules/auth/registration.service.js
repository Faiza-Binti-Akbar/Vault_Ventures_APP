const { ApiError } = require('../../middleware/api-error');
const {
  DuplicateEmailError,
  RegistrationPersistenceUnavailableError,
} = require('./registration.errors');

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

class RegistrationService {
  constructor({ passwordHasher, repository }) {
    this.passwordHasher = passwordHasher;
    this.repository = repository;
  }

  async register({ email, password, roles, consents }) {
    const normalizedEmail = normalizeEmail(email);

    try {
      // Readiness includes validation of consent versions against approved active
      // legal documents. It intentionally runs before the CPU-intensive hash.
      await this.repository.assertReady({ consents });

      const passwordHash = await this.passwordHasher.hash(password);

      return await this.repository.createParticipantTransaction({
        email: normalizedEmail,
        passwordHash,
        roles: [...roles],
        consents: consents.map(({ documentCode, version }) => ({
          documentCode: documentCode.trim(),
          version: version.trim(),
        })),
        initialAccountState: {
          verificationTier: 0,
          emailVerified: false,
        },
      });
    } catch (error) {
      if (error instanceof DuplicateEmailError) {
        throw new ApiError(409, 'CONFLICT', 'Registration cannot be completed');
      }

      if (error instanceof RegistrationPersistenceUnavailableError) {
        throw new ApiError(
          501,
          'FEATURE_NOT_ENABLED',
          'Participant registration persistence is disabled pending approved schema migrations and legal document versions',
        );
      }

      throw error;
    }
  }
}

module.exports = { normalizeEmail, RegistrationService };
