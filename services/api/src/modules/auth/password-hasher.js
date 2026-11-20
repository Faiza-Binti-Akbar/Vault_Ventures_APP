const argon2 = require('argon2');

class Argon2PasswordHasher {
  async hash(password) {
    return argon2.hash(password, { type: argon2.argon2id });
  }

  async verify(hash, password) {
    return argon2.verify(hash, password);
  }
}

module.exports = { Argon2PasswordHasher };
