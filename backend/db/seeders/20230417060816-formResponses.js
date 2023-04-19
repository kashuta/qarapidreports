const { faker } = require('@faker-js/faker');

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInspectorId() {
  const inspectorIds = [3, 4, 5, 6, 7, 8];
  return inspectorIds[Math.floor(Math.random() * inspectorIds.length)];
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formResponses = [];
    let formId4Counter = 0;
    
    for (let i = 0; i < 200; i++) {
      const createdAt = getRandomDate(new Date('2023-01-01'), new Date('2023-04-20'));
      const firstRandom = faker.datatype.number({ min: 1, max: 5 });
      let isSafe = true;
      
      if (firstRandom === 4) {
        formId4Counter++;
        isSafe = formId4Counter % 3 !== 0;
      }
      
      const formResponse = {
        formId: firstRandom,
        inspectorId: getRandomInspectorId(),
        status: faker.helpers.arrayElement(['save', 'submit']),
        isSafe,
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
