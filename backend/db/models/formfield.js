const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FormField extends Model {
    static associate(models) {
      this.belongsTo(models.FormSection, {
        foreignKey: 'formSectionId',
      });
      this.hasMany(models.FormResponseAnswer, {
        foreignKey: 'formFieldId',
      });
    }
  }
  FormField.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      formSectionId: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      modelName: 'FormField',
    },
  );
  return FormField;
};
