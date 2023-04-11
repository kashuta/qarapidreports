const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'roleId',
      });
    }
  }
  Roles.init({
    admin: DataTypes.BOOLEAN,
    manager: DataTypes.BOOLEAN,
    inspector: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
