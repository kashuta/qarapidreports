const BACKEND_ERRORS = {
  INVALID_CREDENTIALS: {
    message: 'Invalid credentials',
  },
  USER_NOT_FOUND: {
    message: 'User not found',
  },
  USER_ALREADY_EXISTS: {
    message: 'User already exists',
  },
  INVALID_TOKEN: {
    message: 'Invalid token',
  },
  TOKEN_EXPIRED: {
    message: 'Token expired',
  },
  INVALID_REFRESH_TOKEN: {
    message: 'Invalid refresh token',
  },
  INVALID_EMAIL: {
    message: 'Invalid email',
  },
  INVALID_PASSWORD: {
    message: 'Invalid password',
  },
  INVALID_USERNAME: {
    message: 'Invalid username',
  },
  VALIDATION_ERROR: {
    message: 'Validation error',
  },
  UNAUTHORIZED_ERROR: {
    message: 'Unauthorized error',
  },
  SWW_ERROR: {
    message: 'Something went wrong. Please try again.',
  },
  USER_ALREADY_ACTIVATED: {
    message: 'User already activated',
  },
  ACTIVATION_LINK_INVALID: {
    message: 'Activation link is invalid',
  },
  USER_NOT_ACTIVATED: {
    message: 'User not activated, please check your email',
  },
  FORM_NOT_FOUND: {
    message: 'Form not found',
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
  },
  DATABASE_ERROR: {
    message: 'Database error',
  },
  INCORRECT_DATA_ERROR: {
    message: 'Incorrect data',
  },

};

module.exports = BACKEND_ERRORS;
