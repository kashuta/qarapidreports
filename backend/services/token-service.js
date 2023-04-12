const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../db/models');

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
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
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded);
      return decoded;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
