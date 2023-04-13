const { validationResult } = require('express-validator');
const userService = require('../services/user-service');
// const ApiError = require('../exceptions/api-errors');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return next(ApiError.badRequestError('Validation error', errors.array()));
      }
      const { userName, email, password } = req.body;
      const userData = await userService.registration(userName, email, password);
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ message: 'Logout success' });
    } catch (err) {
      next(err);
    }
  }

  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await userService.activate(link);
      return res.json({ message: 'Activation success' });
    } catch (err) {
      next(err);
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
      next(err);
    }
  }
}

module.exports = new UserController();
