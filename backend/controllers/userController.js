/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
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
      res.cookie('refreshToken', userData.refreshToken, { // рефреш токен хранится в cookie
        httpOnly: true, // чтобы куку нельзя было иизменять и получать внутри браузера из js
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
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
        maxAge: 1000 * 60 * 60 * 24 * 30,
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
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ message: 'Logout success' });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ message: 'Logout success' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
