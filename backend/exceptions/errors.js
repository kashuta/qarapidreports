const BACKEND_ERRORS = {
  INVALID_CREDENTIALS: {
    // code: 1001,
    message: 'Invalid credentials',
  },
  USER_NOT_FOUND: {
    // code: 1002,
    message: 'User not found',
  },
  USER_ALREADY_EXISTS: {
    // code: 1003,
    message: 'User already exists',
  },
  INVALID_TOKEN: {
    // code: 1004,
    message: 'Invalid token',
  },
  TOKEN_EXPIRED: {
    // code: 1005,
    message: 'Token expired',
  },
  INVALID_REFRESH_TOKEN: {
    // code: 1006,
    message: 'Invalid refresh token',
  },
  INVALID_EMAIL: {
    // code: 1007,
    message: 'Invalid email',
  },
  INVALID_PASSWORD: {
    // code: 1008,
    message: 'Invalid password',
  },
  INVALID_USERNAME: {
    // code: 1009,
    message: 'Invalid username',
  },
  VALIDATION_ERROR: {
    // code: 1010,
    message: 'Validation error',
  },
  UNAUTHORIZED_ERROR: {
    // code: 1011,
    message: 'Unauthorized error',
  },
  SWW_ERROR: { // something went wrong
    // code: 1011,
    message: 'Something went wrong. Please try again.',
  },
  USER_ALREADY_ACTIVATED: {
    // code: 1012,
    message: 'User already activated',
  },
  ACTIVATION_LINK_INVALID: {
    // code: 1013,
    message: 'Activation link is invalid',
  },
  USER_NOT_ACTIVATED: {
    // code: 1014,
    message: 'User not activated, please check your email',
  },
  FORM_NOT_FOUND: {
    // code: 1015,
    message: 'Form not found',
  },

};

module.exports = BACKEND_ERRORS;
