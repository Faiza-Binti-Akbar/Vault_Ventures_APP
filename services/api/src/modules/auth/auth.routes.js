const express = require('express');

const {
  loginParticipant,
  logoutParticipant,
  refreshParticipant,
  getParticipant,
  participantAuth,
  registerParticipant,
} = require('./auth.controller');
const {
  validateLoginRequest,
  validateLogoutRequest,
  validateRefreshRequest,
  validateRegistrationRequest,
} = require('./auth.validation');

const router = express.Router();

router.post('/register', validateRegistrationRequest, registerParticipant);
router.post('/login', validateLoginRequest, loginParticipant);
// Provisional non-production extension: the draft API Contract does not define refresh.
router.post('/refresh', validateRefreshRequest, refreshParticipant);
router.post('/logout', participantAuth, validateLogoutRequest, logoutParticipant);
router.get('/me', participantAuth, getParticipant);

module.exports = router;
