const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      this.hasMany(models.Users, {
        foreignKey: 'roleId',
      });
    }
  }
  Roles.init(
    {
      admin: DataTypes.BOOLEAN,
      manager: DataTypes.BOOLEAN,
      inspector: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Roles',
    }
  );
  return Roles;
};
