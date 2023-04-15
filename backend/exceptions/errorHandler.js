class ErrorHandler extends Error {
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
