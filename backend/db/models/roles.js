const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        foreignKey: 'roleId',
      });
    }
  }
  Roles.init({
    admin: DataTypes.BOOLEAN,
    manager: DataTypes.BOOLEAN,
    inspector: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
