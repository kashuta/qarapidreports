const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { Users, Roles } = require('../db/models');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
// const ApiError = require('../exceptions/api-errors');
// добавление рандомной строки с помощью бикрипт !!!!!!
class UserService {
  async registration(userName, email, password, role = 'manager') {
    try {
      // eslint-disable-next-line no-unused-vars
      const [roleFind, createdRole] = await Roles.findOrCreate({ where: { name: role } });
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
      const userFront = {
        userName: newUser.userName,
        uniqueString: uuid.v4(),
      };
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
      const tokens = await tokenService.generateTokens({ ...userFront });
      await tokenService.saveToken(newUser, tokens.refreshToken);
      return { ...tokens, user: userFront };
    } catch (err) {
      console.log(err);
      // throw error: emails doesnt send; errorHandler
      throw new Error('Emails doesnt send');
    }
  }

  async activate(activationLink) {
    const user = await Users.findOne({ where: { activationLink } });
    if (!user) {
      // throw ApiError.badRequestError('User not found');
    }
    if (user.isActivated) {
      // throw ApiError.badRequestError('User already activated');
    }
    await Users.update({ isActive: true }, { where: { id: user.dataValues.id } });
    const userUpdated = await Users.findOne({ where: { id: user.dataValues.id } });
    const userFront = {
      id: userUpdated.id,
      userName: userUpdated.userName,
      email: userUpdated.email,
      isActive: userUpdated.isActive,
    };
    const tokens = await tokenService.generateTokens({ ...userFront });
    await tokenService.saveToken(user, tokens.refreshToken);
    return { ...tokens, userFront };
  }

  // async login(email, password) {
  //   console.log(email, password);
  //   const user = await User.findOne({ where: { email } });
  //   if (!user) {
  //     // throw ApiError.badRequestError('User not found');
  //   }
  //   if (!user.isActivated) {
  //     // throw ApiError.badRequestError('User not activated, please check your email');
  //   }
  //   const isValid = await bcrypt.compare(password, user.password);
  //   if (!isValid) {
  //     // throw ApiError.badRequestError('Invalid password');
  //   }
  //   const userFront = {
  //     id: user.id,
  //     userName: user.userName,
  //     email: user.email,
  //     photo: user.photo,
  //     isActivated: user.isActivated,
  //   };
  //   const tokens = await tokenService.generateTokens({ ...userFront });
  //   await tokenService.saveToken(user, tokens.refreshToken);
  //   return { ...tokens, userFront };
  // }

  // async logout(refreshToken) {
  //   const token = await tokenService.removeToken(refreshToken);
  //   return token;
  // }
}

module.exports = new UserService();
