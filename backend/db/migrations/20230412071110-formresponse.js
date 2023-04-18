module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('FormResponses', {
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
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('FormResponses');
  },
};
