const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../db/models');

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  async saveToken(newUser, refreshToken) {
    const data = newUser.dataValues.id;
    const tokenData = await RefreshToken.findOne({ where: { userId: data } });
    if (tokenData) {
      await RefreshToken.update({ token: refreshToken }, { where: { userId: data } });
    } else {
      const token = await RefreshToken.create({ userId: data, token: refreshToken });
      return token;
    }
  }

  async removeToken(refreshToken) {
    const token = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (token) {
      await RefreshToken.destroy({ where: { token: refreshToken } });
    }
  }

  async findToken(refreshToken) {
    const token = await RefreshToken.findOne({ where: { refreshToken } });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
