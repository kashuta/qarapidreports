const { faker } = require('@faker-js/faker');

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInspectorId() {
  const inspectorIds = [3, 4, 5];
  return inspectorIds[Math.floor(Math.random() * inspectorIds.length)];
  // return Math.ceil(Math.random() * 35);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formResponses = [];

    for (let i = 0; i < 100; i++) {
      const createdAt = getRandomDate(new Date('2023-01-01'), new Date('2023-04-20'));
      const firstRandom = faker.datatype.number({ min: 1, max: 5 });
      const formResponse = {
        formId: firstRandom,
        inspectorId: getRandomInspectorId(),
        status: faker.helpers.arrayElement(['save', 'submit']),
        createdAt,
        updatedAt: createdAt,
      };

      formResponses.push(formResponse);
    }

    await queryInterface.bulkInsert('FormResponses', formResponses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormResponses', null, {});
  },
};
