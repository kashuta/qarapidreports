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
      this.hasOne(models.Roles, {
        foreignKey: 'roleId',
      });
      this.belongsTo(models.Tokens, {
        foreignKey: 'userId',
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
