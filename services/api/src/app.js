const crypto = require('node:crypto');

const cors = require('cors');
const express = require('express');

const { ApiError } = require('./middleware/api-error');
const { errorHandler } = require('./middleware/error-handler');
const authRouter = require('./modules/auth/auth.routes');
const {
  getParticipant,
  participantAuth,
} = require('./modules/auth/auth.controller');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
app.use(cors());
app.use((req, res, next) => {
  req.requestId = `req_${crypto.randomUUID()}`;
  res.setHeader('X-Request-ID', req.requestId);
  next();
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Vault Ventures API is running',
  });
});

app.use('/api/v1/auth', authRouter);
app.get('/api/v1/me', participantAuth, getParticipant);

app.use((req, res, next) => {
  next(new ApiError(404, 'NOT_FOUND', 'Route not found'));
});

app.use(errorHandler);

module.exports = app;
