const { ApiError } = require('./api-error');
const { verifyAccessToken } = require('../modules/auth/session-token');

function createParticipantAuth(repository) {
  return async function participantAuth(req, res, next) {
    try {
      const authorization = req.get('authorization') ?? '';
      const match = /^Bearer (\S+)$/i.exec(authorization);
      const claims = match ? verifyAccessToken(match[1]) : null;
      if (!claims) {
        throw new ApiError(401, 'AUTHENTICATION_REQUIRED', 'Authentication is required');
      }
      const participant = await repository.findActiveContext(claims.sid, claims.sub);
      if (!participant) {
        throw new ApiError(401, 'SESSION_INVALID', 'Session is expired, revoked, or invalid');
      }
      if (participant.status !== 'active') {
        await repository.revokeSession(claims.sid, 'account_suspended');
        throw new ApiError(403, 'ACCOUNT_SUSPENDED', 'Account is suspended');
      }
      req.auth = { sessionId: claims.sid, participant };
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { createParticipantAuth };
