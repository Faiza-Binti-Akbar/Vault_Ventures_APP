const crypto = require('node:crypto');

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60;

function encode(value) {
  return Buffer.from(value).toString('base64url');
}

function signingSecret() {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('JWT_ACCESS_SECRET must contain at least 32 bytes');
  }
  return secret;
}

function signAccessToken({ accountId, sessionId, now = Date.now() }) {
  const issuedAt = Math.floor(now / 1000);
  const header = encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = encode(JSON.stringify({
    sub: accountId,
    sid: sessionId,
    typ: 'access',
    iat: issuedAt,
    exp: issuedAt + ACCESS_TOKEN_TTL_SECONDS,
  }));
  const signature = crypto
    .createHmac('sha256', signingSecret())
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}

function verifyAccessToken(token, { now = Date.now() } = {}) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const expected = crypto
    .createHmac('sha256', signingSecret())
    .update(`${parts[0]}.${parts[1]}`)
    .digest();
  let supplied;
  try {
    supplied = Buffer.from(parts[2], 'base64url');
  } catch {
    return null;
  }
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    if (
      payload.typ !== 'access' ||
      typeof payload.sub !== 'string' ||
      typeof payload.sid !== 'string' ||
      !Number.isInteger(payload.exp) ||
      payload.exp <= Math.floor(now / 1000)
    ) return null;
    return payload;
  } catch {
    return null;
  }
}

function createRefreshToken() {
  return crypto.randomBytes(32).toString('base64url');
}

function hashRefreshToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = {
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
  createRefreshToken,
  hashRefreshToken,
  signAccessToken,
  verifyAccessToken,
};
