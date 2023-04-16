const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles, {
        foreignKey: 'roleId',
      });
      this.hasMany(models.EmailVerificationToken, {
        foreignKey: 'userId',
      });
      this.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
      });
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    isActive: DataTypes.BOOLEAN,
    activationLink: DataTypes.TEXT,
    roleId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
