const { ApiError } = require('./api-error');

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let safeError = error;

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    safeError = new ApiError(400, 'VALIDATION_FAILED', 'Request body is not valid JSON', [
      { field: 'body', message: 'Provide a valid JSON object.' },
    ]);
  }

  const isKnownError = safeError instanceof ApiError;
  const status = isKnownError ? safeError.status : 500;
  const code = isKnownError ? safeError.code : 'INTERNAL_ERROR';
  const message = isKnownError ? safeError.message : 'Request cannot be completed';
  const fields = isKnownError ? safeError.fields : [];

  return res.status(status).json({
    error: { code, message, fields },
    meta: { requestId: req.requestId },
  });
}

module.exports = { errorHandler };
