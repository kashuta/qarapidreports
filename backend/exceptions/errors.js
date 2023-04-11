const BACKEND_ERRORS = {
  INVALID_CREDENTIALS: {
    code: 1001,
    message: 'Invalid credentials',
  },
  USER_NOT_FOUND: {
    code: 1002,
    message: 'User not found',
  },
  USER_ALREADY_EXISTS: {
    code: 1003,
    message: 'User already exists',
  },
  INVALID_TOKEN: {
    code: 1004,
    message: 'Invalid token',
  },
  TOKEN_EXPIRED: {
    code: 1005,
    message: 'Token expired',
  },
  INVALID_REFRESH_TOKEN: {
    code: 1006,
    message: 'Invalid refresh token',
  },
  INVALID_EMAIL: {
    code: 1007,
    message: 'Invalid email',
  },
  INVALID_PASSWORD: {
    code: 1008,
    message: 'Invalid password',
  },
  INVALID_USERNAME: {
    code: 1009,
    message: 'Invalid username',
  },
};

module.exports = BACKEND_ERRORS;
