const { Model } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a location
    const [location] = await queryInterface.bulkInsert('Locations', [{
      name: 'Dubai',
      managerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Abu Dhabi',
      managerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sharjah',
      managerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { returning: true });

    // Create a form associated with the location
    await queryInterface.bulkInsert('Forms', [{
      name: 'Form 1',
      locationId: location.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    // Get the ID of the form
    const [form] = await queryInterface.sequelize.query('SELECT id FROM "Forms" LIMIT 1;');
    const formId = form.id;

    // Create form sections associated with the form
    await queryInterface.bulkInsert('FormSections', [
      {
        name: 'Section 1',
        formId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Section 2',
        formId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create form fields associated with the form sections
    await queryInterface.bulkInsert('FormFields', [
      {
        name: 'Field 1',
        type: 'text',
        options: null,
        required: true,
        formSectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field 2',
        type: 'checkbox',
        options: '[{"label": "Option 1", "value": "1"}, {"label": "Option 2", "value": "2"}]',
        required: false,
        formSectionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field 3',
        type: 'radio',
        options: '[{"label": "Option 1", "value": "1"}, {"label": "Option 2", "value": "2"}]',
        required: true,
        formSectionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormFields', null, {});
    await queryInterface.bulkDelete('FormSections', null, {});
    await queryInterface.bulkDelete('Forms', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
  },
};
