module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('FormResponseAnswers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('FormResponseAnswers');
  },
};
