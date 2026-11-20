const { ApiError } = require('../../middleware/api-error');

const PARTICIPANT_ROLES = new Set(['founder', 'investor', 'professional']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldError(field, message) {
  return { field, message };
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateObjectBody(body, fields) {
  if (!isPlainObject(body)) {
    fields.push(fieldError('body', 'Request body must be a JSON object.'));
    return false;
  }

  return true;
}

function validateEmail(email, fields) {
  if (typeof email !== 'string' || email.trim() === '') {
    fields.push(fieldError('email', 'Email is required and must be a string.'));
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    fields.push(fieldError('email', 'Email format is invalid.'));
  }
}

function validatePassword(password, fields) {
  if (typeof password !== 'string' || password.length === 0) {
    fields.push(fieldError('password', 'Password is required and must be a string.'));
  }
}

function validateRoles(roles, fields) {
  if (!Array.isArray(roles) || roles.length === 0) {
    fields.push(fieldError('roles', 'At least one participant role is required.'));
    return;
  }

  roles.forEach((role, index) => {
    if (typeof role !== 'string' || !PARTICIPANT_ROLES.has(role)) {
      fields.push(
        fieldError(
          `roles[${index}]`,
          'Role must be founder, investor, or professional.',
        ),
      );
    }
  });

  if (roles.every((role) => typeof role === 'string')) {
    const uniqueRoles = new Set(roles);
    if (uniqueRoles.size !== roles.length) {
      fields.push(fieldError('roles', 'Participant roles must not contain duplicates.'));
    }
  }
}

function validateConsents(consents, fields) {
  if (!Array.isArray(consents) || consents.length === 0) {
    fields.push(fieldError('consents', 'At least one consent record is required.'));
    return;
  }

  consents.forEach((consent, index) => {
    if (!isPlainObject(consent)) {
      fields.push(fieldError(`consents[${index}]`, 'Consent must be an object.'));
      return;
    }

    if (typeof consent.documentCode !== 'string' || consent.documentCode.trim() === '') {
      fields.push(
        fieldError(
          `consents[${index}].documentCode`,
          'Consent documentCode is required and must be a string.',
        ),
      );
    }

    if (typeof consent.version !== 'string' || consent.version.trim() === '') {
      fields.push(
        fieldError(
          `consents[${index}].version`,
          'Consent version is required and must be a string.',
        ),
      );
    }
  });
}

function rejectInvalid(fields) {
  if (fields.length > 0) {
    throw new ApiError(400, 'VALIDATION_FAILED', 'Request validation failed', fields);
  }
}

function validateRegistrationRequest(req, res, next) {
  try {
    const fields = [];

    if (validateObjectBody(req.body, fields)) {
      validateEmail(req.body.email, fields);
      validatePassword(req.body.password, fields);
      validateRoles(req.body.roles, fields);
      validateConsents(req.body.consents, fields);
    }

    rejectInvalid(fields);
    next();
  } catch (error) {
    next(error);
  }
}

function validateLoginRequest(req, res, next) {
  try {
    const fields = [];

    if (validateObjectBody(req.body, fields)) {
      validateEmail(req.body.email, fields);
      validatePassword(req.body.password, fields);
    }

    rejectInvalid(fields);
    next();
  } catch (error) {
    next(error);
  }
}

function validateLogoutRequest(req, res, next) {
  try {
    const fields = [];

    if (req.body !== undefined && !isPlainObject(req.body)) {
      fields.push(fieldError('body', 'Request body must be a JSON object when provided.'));
    }

    rejectInvalid(fields);
    next();
  } catch (error) {
    next(error);
  }
}

function validateRefreshRequest(req, res, next) {
  try {
    const fields = [];
    if (validateObjectBody(req.body, fields)) {
      if (typeof req.body.refreshToken !== 'string' || req.body.refreshToken.length < 32) {
        fields.push(fieldError('refreshToken', 'A valid refresh token is required.'));
      }
    }
    rejectInvalid(fields);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  PARTICIPANT_ROLES,
  validateLoginRequest,
  validateLogoutRequest,
  validateRefreshRequest,
  validateRegistrationRequest,
};
