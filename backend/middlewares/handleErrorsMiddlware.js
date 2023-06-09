const ErrorHandler = require('../exceptions/errorHandler');

/**
 * Express middleware for handling errors and sending formatted JSON responses to the client.
 * @param {Error} err - The error object to handle.
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object to send the error to.
 * @param {function} next - The next middleware function to call.
 * @returns {void} - Returns the next middleware function.
 */
module.exports = function (err, req, res, next) {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json(err.resJson());
  }
  const internalError = new ErrorHandler(500, `INTERNAL_SERVER_ERROR: ${err.message}`);
  return res.status(internalError.statusCode).json(internalError.resJson());
};
