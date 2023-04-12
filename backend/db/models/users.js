const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Roles, {
        foreignKey: 'roleId',
      });
      this.hasOne(models.EmailVerificationToken, {
        foreignKey: 'userId',
      });
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    isActive: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
