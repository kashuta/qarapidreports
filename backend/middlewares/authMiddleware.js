/* eslint-disable func-names */
const tokenServise = require('../services/token-service');

module.exports = function (req, res, next) {
  try {
    const autorizationHeader = req.headers.authorization;
    if (!autorizationHeader) {
      return next({ message: 'Unauthorized error', statusCode: 401 });
    }

    const accessToken = autorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next({ message: 'Unauthorized error', statusCode: 401 });
    }

    const userData = tokenServise.validateAccessToken(accessToken);
    if (!userData) {
      return next({ message: 'Unauthorized error', statusCode: 401 });
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(error);
  }
};
