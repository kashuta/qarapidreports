const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
      this.hasOne(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    isActivated: DataTypes.BOOLEAN,
    activationLink: DataTypes.TEXT,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
