const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FormSection extends Model {
    static associate(models) {
      // Связи между моделями
      this.belongsTo(models.Form, {
        foreignKey: 'formId',
      });
      this.hasMany(models.FormField, {
        foreignKey: 'formSectionId',
      });
    }
  }

  FormSection.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
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
    modelName: 'FormSection',
  });

  return FormSection;
};
