class ErrorHandler extends Error {
  /**
   * Create a new ErrorHandler instance.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} code - The error code associated with the error.
   * @param {string} message - A user-friendly error message describing the error.
   * @param {string} [name=Error] - The name of the error.
   * @param {string} [stack=''] - The error stack trace.
   */
  // constructor(statusCode, code, message, name = 'Error', stack = '') {
  //   super(message);
  //   this.statusCode = statusCode;
  //   this.code = code;
  //   this.name = name;
  //   this.stack = stack;
  // }

  constructor(statusCode, code, message) {
    super(message);
  }

  statusCode;

  errMessage;

  static resJson = () => ({
    status: 'error',
    statusCode: this.statusCode,
    message: this.errMessage,
  });

  /**
   * Handle the given error by formatting it as a JSON response and sending it to the client.
   * @param {ErrorHandler} err - The error to handle.
   * @param {express.Response} res - The HTTP response object to send the error to.
   * @returns {void}
   */
  // static handleError(err, res) {
  //   const {
  //     statusCode, code, name, stack,
  //   } = err;
  //   console.log(BACKEND_ERRORS[code]); // не получится так получить код
  //   const errorMessage = BACKEND_ERRORS[code]?.message || err.message || 'Internal Server Error';
  //   console.error(`||||||||||||${name}: ${errorMessage}\n${stack}`);
  //   res.status(statusCode).json({
  //     status: 'error',
  //     statusCode,
  //     code, // зачем на фронте наш код нужен?
  //     name,
  //     message: errorMessage,
  //   });
  // }

  static BadRequestError({ message }, res) {
    this.statusCode = 400;
    this.errMessage = message;
    return res.status(this.statusCode).json(this.resJson());
  }

  static UnautorizedError({ message }, res) {
    this.statusCode = 401;
    this.errMessage = message;
    return res.status(this.statusCode).json(this.resJson());
  }

  static UnprocessableEntityError({ message }, res) {
    this.statusCode = 422;
    this.errMessage = message;
    return res.status(this.statusCode).json(this.resJson());
  }
}

module.exports = ErrorHandler;
