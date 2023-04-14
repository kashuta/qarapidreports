const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { Users, Roles } = require('../db/models');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
// const ApiError = require('../exceptions/api-errors');
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
        // throw ApiError.badRequestError('User already exists');
        throw new Error('User already exists');
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
      // throw error: emails doesnt send; errorHandler
      throw new Error('Emails doesnt send');
    }
  }

  async activate(activationLink) {
    try {
      const user = await Users.findOne({ where: { activationLink } });
      if (!user) {
        // throw ApiError.badRequestError('User not found');
        throw new Error('User not found');
      }
      if (user.isActive) {
        // throw ApiError.badRequestError('User already activated');
        throw new Error('User already activated');
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
      console.log(err);
      // throw error: emails doesnt send; errorHandler
      throw new Error('Activation link is invalid');
    }
  }

  async login(email, password) {
    try {
      const user = await Users.findOne({ where: { email } });
      // console.log(user);
      const role = await Roles.findOne({ where: { id: user.dataValues.roleId }, raw: true });
      let roleName;
      for (const key in role) {
        if (role[key] === true) {
          roleName = key;
        }
      }
      if (!user) {
        // throw ApiError.badRequestError('User not found');
        throw new Error('User not found');
      }
      if (!user.isActive) {
        // throw ApiError.badRequestError('User not activated, please check your email');
        throw new Error('User not activated, please check your email');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        // throw ApiError.badRequestError('Invalid password');
        throw new Error('Invalid password');
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
      console.log(err);
      // throw error: emails doesnt send; errorHandler
      throw new Error('Something went wrong');
    }
  }

  async logout(refreshToken) {
    try {
      if (!refreshToken) {
        // throw ApiError.badRequestError('Unauthorized');
        throw new Error('Unauthorized');
      }
      const token = await tokenService.removeToken(refreshToken);
      return token;
    } catch (err) {
      console.log(err);
      // throw error: emails doesnt send; errorHandler
      throw new Error('Something went wrong');
    }
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        // throw ApiError.badRequestError('Unauthorized');
        throw new Error('Unauthorized');
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const tokenFromDB = await tokenService.findToken(refreshToken);
      if (!tokenFromDB || !userData) {
        // throw ApiError.badRequestError('Unauthorized');
        throw new Error('Unauthorized');
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
      console.log(err);
      // throw error: emails doesnt send; errorHandler
      throw new Error('Something went wrong');
    }
  }
}

module.exports = new UserService();
