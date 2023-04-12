module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('FormSections', {
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
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('FormSections');
  },
};
