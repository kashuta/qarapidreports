module.exports = class AuthMiddleware {
  static async auth(req, res, next) {
    // checking if user is authenticat

    next();
  }
};
