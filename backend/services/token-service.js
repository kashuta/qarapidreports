const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  async saveToken(newUser, refreshToken) {
    const data = newUser.dataValues.id;
    const tokenData = await Token.findOne({ where: { userId: data } });
    if (tokenData) {
      await Token.update({ refreshToken }, { where: { userId: data } });
    } else {
      const token = await Token.create({ userId: data, refreshToken });
      return token;
    }
  }

  async removeToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } });
    if (token) {
      await Token.destroy({ where: { refreshToken } });
    }
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } });
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
