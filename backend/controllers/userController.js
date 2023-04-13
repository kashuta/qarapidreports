const { validationResult } = require('express-validator');
const userService = require('../services/user-service');
const { ErrorHandler, backendErrors } = require('../exceptions/index');

class UserController {
  async registration(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      console.log(validationErrors);
      if (!validationErrors.isEmpty()) {
        switch (validationErrors.errors[0].param) {
          case 'userName': return next(ErrorHandler.UnprocessableEntityError(backendErrors.INVALID_USERNAME, res));
          case 'email': return next(ErrorHandler.UnprocessableEntityError(backendErrors.INVALID_EMAIL, res));
          case 'password': return next(ErrorHandler.UnprocessableEntityError(backendErrors.INVALID_PASSWORD, res));
          default: return next(ErrorHandler.UnprocessableEntityError(backendErrors.SWW_ERROR, res));
        }
      }
      const { userName, email, password } = req.body;
      const userData = await userService.registration(userName, email, password);
      return res.json(userData);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (email === '' || password === '') {
        return next(ErrorHandler.UnprocessableEntityError(backendErrors.VALIDATION_ERROR, res));
      }
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      });
      return res.json(userData);
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ message: 'Logout success' });
    } catch (err) {
      return next(ErrorHandler.UnautorizedError(err, res));
    }
  }

  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await userService.activate(link);
      res.render('view');
    } catch (err) {
      return next(ErrorHandler.BadRequestError(err, res));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      });
      return res.json(userData);
    } catch (err) {
      return next(ErrorHandler.UnautorizedError(err, res));
    }
  }
}

module.exports = new UserController();
