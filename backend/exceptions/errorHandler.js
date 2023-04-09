const { error } = require('winston');
const BACKEND_ERRORS = require('./errors');

class ErrorHandler extends Error {
  /**
   * Create a new ErrorHandler instance.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} code - The error code associated with the error.
   * @param {string} message - A user-friendly error message describing the error.
   * @param {string} [name=Error] - The name of the error.
   * @param {string} [stack=''] - The error stack trace.
   */
  constructor(statusCode, code, message, name = 'Error', stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = name;
    this.stack = stack;
  }

  /**
   * Handle the given error by formatting it as a JSON response and sending it to the client.
   * @param {ErrorHandler} err - The error to handle.
   * @param {express.Response} res - The HTTP response object to send the error to.
   * @returns {void}
   */
  static handleError(err, res) {
    const { statusCode, code, name, stack } = err;
    const errorMessage = BACKEND_ERRORS[code]?.message || err.message || 'Internal Server Error';
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      code,
      name,
      message: errorMessage
    });

    console.error(`${name}: ${errorMessage}\n${stack}`);
  }
}

module.exports = ErrorHandler;
