module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('FormFields', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      formId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Forms',
          key: 'id',
        },
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
        references: {
          model: 'FormSections',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('FormFields');
  },
};
