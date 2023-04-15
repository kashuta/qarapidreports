const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { Users, Roles } = require('../db/models');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const { backendErrors } = require('../exceptions');

class UserService {
  async registration(userName, email, password, role = 'manager') {
    try {
      const [roleFind, createdRole] = await Roles.findOrCreate({ where: { [role]: true } });
      const [newUser, createdUser] = await Users.findOrCreate({
        where: { email },
        defaults: {
          userName,
          email,
          password: await bcrypt.hash(password, 7),
          roleId: roleFind.dataValues.id,
        },
      });
      if (!createdUser) {
        throw backendErrors.USER_ALREADY_EXISTS;
      }
      const activationLink = uuid.v4();
      await Users.update({ activationLink }, { where: { id: newUser.dataValues.id } });
      const userFront = {
        userName: newUser.userName,
        uniqueString: uuid.v4(),
      };
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/v2/activate/${activationLink}`);
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(newUser, tokens.refreshToken);
      return { ...tokens, user: userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async activate(activationLink) {
    try {
      const user = await Users.findOne({ where: { activationLink } });
      if (!user) {
        throw backendErrors.USER_NOT_FOUND;
      }
      if (user.isActive) {
        throw backendErrors.USER_ALREADY_ACTIVATED;
      }
      await Users.update({ isActive: true }, { where: { id: user.dataValues.id } });
      const userUpdated = await Users.findOne({ where: { id: user.dataValues.id } });
      const userFront = {
        userName: userUpdated.userName,
      };
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { ...tokens, userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(email, password) {
    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        console.log('!HERE');
        throw backendErrors.USER_NOT_FOUND;
      }
      if (!user.isActive) {
        throw backendErrors.USER_NOT_ACTIVATED;
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw backendErrors.INVALID_PASSWORD;
      }
      const role = await Roles.findOne({ where: { id: user.dataValues.roleId }, raw: true });
      let roleName;
      for (const key in role) {
        if (role[key] === true) {
          roleName = key;
        }
      }
      const userFront = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: roleName,
      };
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { ...tokens, userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async logout(refreshToken) {
    try {
      if (!refreshToken) {
        throw backendErrors.UNAUTHORIZED_ERROR;
      }
      const token = await tokenService.removeToken(refreshToken);
      return token;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw backendErrors.UNAUTHORIZED_ERROR;
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const tokenFromDB = await tokenService.findToken(refreshToken);
      if (!tokenFromDB || !userData) {
        throw backendErrors.UNAUTHORIZED_ERROR;
      }
      const user = await Users.findByPk(userData.id);
      const role = await Roles.findOne({ where: { id: user.roleId }, raw: true });
      let roleName;
      for (const key in role) {
        if (role[key] === true) {
          roleName = key;
        }
      }
      const userFront = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: roleName,
      };
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(user, tokens.refreshToken);
      return { ...tokens, userFront };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new UserService();
