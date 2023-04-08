const ErrorHandler = require('../exceptions/errorHandler');

/**
 * Express middleware for handling errors and sending formatted JSON responses to the client.
 * @param {Error} err - The error object to handle.
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object to send the error to.
 * @param {function} next - The next middleware function to call.
 * @returns {void} - Returns the next middleware function.
 */
module.exports = function(err, req, res, next) {
    console.log(err, 'err');
    if (err instanceof ErrorHandler) {
        ErrorHandler.handleError(err, res);
    } else {
        console.log(err, 'err');
        ErrorHandler.handleError(
            new ErrorHandler(500, 'INTERNAL_SERVER_ERROR', err.message, err.name, err.stack),
            res,
        );
    }
    console.log(res, 'res');
    next();
};

