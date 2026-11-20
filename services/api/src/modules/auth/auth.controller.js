const { Argon2PasswordHasher } = require('./password-hasher');
const {
  createConfiguredRegistrationRepository,
} = require('./registration.repository');
const { RegistrationService } = require('./registration.service');
const { MySqlSessionRepository } = require('./session.repository.mysql');
const { SessionService, accountView } = require('./session.service');

const registrationService = new RegistrationService({
  passwordHasher: new Argon2PasswordHasher(),
  repository: createConfiguredRegistrationRepository(),
});
let sessionDependencies;
function sessions() {
  if (!sessionDependencies) {
    const enabled = process.env.SESSION_PERSISTENCE_ENABLED === 'true';
    const repository = enabled
      ? new MySqlSessionRepository(require('../../config/database'))
      : {
          assertReady: async () => false,
          findActiveContext: async () => null,
          revokeSession: async () => false,
        };
    sessionDependencies = {
      repository,
      service: new SessionService({ passwordHasher: new Argon2PasswordHasher(), repository }),
    };
  }
  return sessionDependencies;
}

async function registerParticipant(req, res, next) {
  try {
    const account = await registrationService.register(req.body);
    res.status(201).json({
      data: account,
      meta: { requestId: req.requestId },
    });
  } catch (error) {
    next(error);
  }
}

async function loginParticipant(req, res, next) {
  try {
    const result = await sessions().service.login(req.body);
    res.status(200).json({ data: result, meta: { requestId: req.requestId } });
  } catch (error) {
    next(error);
  }
}

async function logoutParticipant(req, res, next) {
  try {
    await sessions().repository.revokeSession(req.auth.sessionId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function refreshParticipant(req, res, next) {
  try {
    const result = await sessions().service.refresh(req.body);
    res.status(200).json({ data: result, meta: { requestId: req.requestId } });
  } catch (error) {
    next(error);
  }
}

function getParticipant(req, res) {
  res.status(200).json({
    data: accountView(req.auth.participant),
    meta: { requestId: req.requestId },
  });
}

function participantAuth(req, res, next) {
  const { createParticipantAuth } = require('../../middleware/participant-auth');
  return createParticipantAuth(sessions().repository)(req, res, next);
}

module.exports = {
  loginParticipant,
  logoutParticipant,
  refreshParticipant,
  getParticipant,
  participantAuth,
  registerParticipant,
};
