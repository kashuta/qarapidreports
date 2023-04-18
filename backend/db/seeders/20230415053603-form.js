const createForm = (id, name) => ({
  id,
  name,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formData = [
      createForm(1, 'MONTHLY SAFETY CHECKLIST - FIELD SERVICES'),
      createForm(2, 'VEHICLE SAFETY INSPECTION - CHECKLIST'),
      createForm(3, 'FORKLIFT SAFETY INSPECTION CHECKLIST'),
      createForm(4, 'HSE OBSERVATION (STOP) CARD'),
      createForm(5, 'TOOL BOX SAFETY MEETING FORM'),
    ];

    await queryInterface.bulkInsert('Forms', formData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Forms', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
