const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FormResponseAnswer extends Model {
    static associate(models) {
      // Связи между моделями
      this.belongsTo(models.FormResponse, {
        foreignKey: 'formResponseId',
      });
    }
  }

  FormResponseAnswer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formResponseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FormResponses',
        key: 'id',
      },
    },
    answer: {
      type: DataTypes.JSON,
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
    modelName: 'FormResponseAnswer',
  });

  return FormResponseAnswer;
};
