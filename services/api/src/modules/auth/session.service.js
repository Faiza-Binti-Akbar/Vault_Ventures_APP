const { ApiError } = require('../../middleware/api-error');
const { normalizeEmail } = require('./registration.service');
const {
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
  createRefreshToken,
  hashRefreshToken,
  signAccessToken,
} = require('./session-token');

const INVALID_CREDENTIALS = new ApiError(
  401,
  'INVALID_CREDENTIALS',
  'Email or password is incorrect',
);

function accountView(account) {
  return {
    accountId: account.public_id,
    email: account.email,
    status: account.status,
    verificationTier: account.verification_tier,
    emailVerified: Boolean(account.email_verified_at),
    roles: account.roles,
  };
}

class SessionService {
  constructor({ passwordHasher, repository }) {
    this.passwordHasher = passwordHasher;
    this.repository = repository;
  }

  async ensureReady() {
    if (!(await this.repository.assertReady())) {
      throw new ApiError(
        503,
        'AUTH_SESSION_SCHEMA_REQUIRED',
        'Participant sessions are unavailable until the reviewed session migration is explicitly applied',
      );
    }
  }

  async login({ email, password, deviceLabel }) {
    await this.ensureReady();
    const account = await this.repository.findAccountByEmail(normalizeEmail(email));
    if (!account || !(await this.passwordHasher.verify(account.password_hash, password))) {
      throw INVALID_CREDENTIALS;
    }
    if (account.status !== 'active') {
      throw new ApiError(403, 'ACCOUNT_SUSPENDED', 'Account is suspended');
    }
    const refreshToken = createRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000);
    const { sessionId } = await this.repository.createSession({
      accountDbId: account.id,
      refreshTokenHash: hashRefreshToken(refreshToken),
      expiresAt,
      deviceLabel,
    });
    return {
      accessToken: signAccessToken({ accountId: account.public_id, sessionId }),
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      account: accountView(account),
    };
  }

  async refresh({ refreshToken }) {
    await this.ensureReady();
    const nextRefreshToken = createRefreshToken();
    const result = await this.repository.rotateSession({
      refreshTokenHash: hashRefreshToken(refreshToken),
      nextRefreshTokenHash: hashRefreshToken(nextRefreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    });
    if (result.status === 'suspended') {
      throw new ApiError(403, 'ACCOUNT_SUSPENDED', 'Account is suspended');
    }
    if (result.status !== 'rotated') {
      throw new ApiError(401, 'SESSION_INVALID', 'Session is expired, revoked, or invalid');
    }
    return {
      accessToken: signAccessToken({
        accountId: result.account.public_id,
        sessionId: result.sessionId,
      }),
      refreshToken: nextRefreshToken,
      tokenType: 'Bearer',
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      account: accountView(result.account),
    };
  }
}

module.exports = { accountView, SessionService };
