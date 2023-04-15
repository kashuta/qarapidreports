'use strict';

const monthlySafety = [
  { title: 'ASPECTS FOR INSPECTION', order: 1 },
  { title: 'YES', order: 2 },
  { title: 'NO', order: 3 },
  { title: 'N/A', order: 4 },
  { title: 'COMMENTS', order: 5 },
];

const vehicleInspection = [
  { title: 'ITEM INSPECTED', order: 1 },
  { title: 'YES', order: 2 },
  { title: 'NO', order: 3 },
  { title: 'N/A', order: 4 },
  { title: 'COMMENTS', order: 5 },
];

const forkliftInspection = [
  { title: 'What are you inspecting?', order: 1 },
  { title: 'What are you looking for?', order: 2 },
  { title: 'OK', order: 3 },
  { title: 'NOT OK', order: 4 },
  { title: 'Action Needed', order: 5 },
];
const hseObservation = [
  { title: 'OBSERVATION TYPE?', order: 1 },
  { title: 'OBSERVATION DESCRIPTION', order: 2 },
  { title: 'CONTAINMENT ACTION', order: 3 },
  { title: 'PROPOSED IMPROVEMENT', order: 4 },
];
const toolBoxMeeting = [
  { title: 'Description of the job', order: 1 },
  { title: 'HSE points discussed', order: 2 },
  { title: 'ACTION', order: 3 },
  { title: 'Staff who participated in the meeting', order: 4 },
];

const sectionsData = [
  ...monthlySafety.map((section) => ({ ...section, formId: 1 })),
  ...vehicleInspection.map((section) => ({ ...section, formId: 2 })),
  ...forkliftInspection.map((section) => ({ ...section, formId: 3 })),
  ...hseObservation.map((section) => ({ ...section, formId: 4 })),
  ...toolBoxMeeting.map((section) => ({ ...section, formId: 5 })),
].map((section, index) => ({
  id: index + 1,
  ...section,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FormSections', sectionsData);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormSections', null, {});
  },
};
