/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Locations',
      [
        {
          name: 'Dubai',
          managerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Abu Dhabi',
          managerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sharjah',
          managerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
