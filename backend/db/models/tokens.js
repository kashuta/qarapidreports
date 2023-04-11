const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
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
    }
  }
  Tokens.init({
    refreshToken: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};
