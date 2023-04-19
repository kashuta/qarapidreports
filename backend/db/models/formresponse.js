const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FormResponse extends Model {
    static associate(models) {
      // Связи между моделями
      this.belongsTo(models.Users, {
        // as: 'inspector',
        foreignKey: 'inspectorId',
      });
      this.hasMany(models.FormResponseAnswer, {
        foreignKey: 'formResponseId',
      });
      this.belongsTo(models.Form, {
        foreignKey: 'formId',
      });
    }
  }

  FormResponse.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inspectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSafe: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'FormResponse',
  });

  return FormResponse;
};
