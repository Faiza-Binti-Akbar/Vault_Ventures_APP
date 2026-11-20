class DuplicateEmailError extends Error {
  constructor() {
    super('Duplicate participant email');
    this.name = 'DuplicateEmailError';
  }
}

class RegistrationPersistenceUnavailableError extends Error {
  constructor(blockers) {
    super('Participant registration persistence is unavailable');
    this.name = 'RegistrationPersistenceUnavailableError';
    this.blockers = blockers;
  }
}

module.exports = {
  DuplicateEmailError,
  RegistrationPersistenceUnavailableError,
};
