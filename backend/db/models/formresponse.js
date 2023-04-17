const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FormResponse extends Model {
    static associate(models) {
      // Связи между моделями
      this.belongsTo(models.Users, {
        as: 'inspector',
        foreignKey: 'inspectorId',
      });
      this.hasMany(models.FormResponseAnswer, {
        foreignKey: 'formResponseId',
      });
    }
  }

  FormResponse.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // из объекта ответа
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // из объекта ответа
    inspectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    // из объекта ответа
    status: {
      type: DataTypes.STRING,
      allowNull: false,
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
