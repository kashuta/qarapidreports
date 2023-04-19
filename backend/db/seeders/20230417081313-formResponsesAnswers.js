const { faker } = require('@faker-js/faker');

const forms = {
  1: {
    'All field service vehicles inspection completed as per schedule?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'All PPE is in good condition and suitable for task?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'All vehicles have OXY inspection tag up to date?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'All materials used for work are stored correctly?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'All H2S detectors are working properly?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'IVMS, blue key system are working without any problems?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'Are all HSE training cards for each employee are carried by employee and up to date?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'Do all employees have their own blue key?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'Is housekeeping in workshop and store acceptable?': {
      condition: 'yes',
      actionsNeeded: '',
    },
    'Are chemical ontainers identified and stored on top of spill retention pallets?': {
      condition: 'no',
      actionsNeeded: '',
      comments: 'qwe',
    },
    'Is preventive maintenance of PCM machines up to date?': {
      condition: 'na',
      actionsNeeded: '',
      comments: 'rty',
    },
    'Is calibration for all measuring tools valid?': {
      condition: 'no',
      actionsNeeded: '',
      comments: 'asd',
    },
    'Have you checked JSAs to ensure they are still valid?': {
      condition: 'no',
      actionsNeeded: '',
      comments: 'fgh',
    },
    location: 'Dubai',
    date: '2023-04-17T08:46:17.287Z',
  },
  2: {
    'All vehicle lights are functioning': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Vehicle monitoring system (IVMS) is ok': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Brake fluid level is ok': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Engine oil level is ok': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Radiator coolant level is ok': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Windshield wiper/Washer fluid is ok': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Drinking water available inside': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Tire Pressure (including spare) is ok': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Fire extinguisher is available and pressurized': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'First aid kit is available and contents not expired': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Reflective jacket is available': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Reflective triangle is available': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'Jack and wheel wrench are available': {
      condition: 'ok',
      actionsNeeded: '',
    },
    'OXY inspection sticker is valid': {
      condition: 'no',
      actionsNeeded: '',
      comments: 'asd',
    },
    'Maintenance status is ok': {
      condition: 'na',
      actionsNeeded: '',
      comments: 'fgh',
    },
    location: 'Moscow',
    regNumber: 'asd',
    date: '2023-04-17T08:42:19.419Z',
    MileageReading: '555',
    NextMileage: '666',
    nextDate: '2023-04-20T08:42:19.000Z',
  },
  3: {
    location: 'Moscow',
    operator: 'r',
    date: '2023-04-17T08:48:09.068Z',
    machineHours: '4',
    regNumber: 'r',
    signature: 'r',
    Fuel: {
      condition: 'ok',
    },
    'Hydraulic Oil': {
      condition: 'ok',
    },
    'Engine Oil': {
      condition: 'nok',
      actionsNeeded: 'rr',
    },
    'Radiator Coolant': {
      condition: 'ok',
    },
    'Transmission Fluid': {
      condition: 'ok',
    },
    Tires: {
      condition: 'ok',
    },
    Forks: {
      condition: 'ok',
    },
    'Mast Chains and hoses': {
      condition: 'ok',
    },
    'Overhead Guard': {
      condition: 'ok',
    },
    Battery: {
      condition: 'ok',
    },
    'Engine Belt': {
      condition: 'ok',
    },
    'Air filter': {
      condition: 'ok',
    },
    'Service Brake': {
      condition: 'ok',
    },
    'Steering Operation': {
      condition: 'ok',
    },
    'Drive Control – Forward/Reverse': {
      condition: 'ok',
    },
    'Parking Brake': {
      condition: 'ok',
    },
    'Tilt Control – Forward and Back': {
      condition: 'ok',
    },
    'Hoist and Lowering Control': {
      condition: 'ok',
    },
    'Horn and Lights': {
      condition: 'ok',
    },
    'Gauges: Speed, Oil, Hours, Fuel, Temp': {
      condition: 'ok',
    },
  },
  //   HSE form object:
  // {"formId": "4",
  //    "userId": 5,
  //    "status": "submit",
  //   "formData": {
  //     "location": "Tbilisi",
  //     "observer": "grgr",
  //     "date": "2023-04-19T12:31:01.905Z",
  //     "time": null,
  //     "description": "rgg",
  //     "action": "grg",
  //     "improvement": "rg",
  //     "observationType": "Unsafe act",
  //     "healthHazard": true,
  //     "environmentalRisk": true,
  //     "unsafeCondition": false
  //   },
  //   "isSafe": false,
  //   "images": "recom2.png, recom1.png"
  // }
  4: { name: 'Form Four' },
  // {
  //   "formId": "5",
  //   "userId": 5,
  //   "status": "submit",
  //   "images": "recom2.png, recom1.png",
  //   "formData": {
  //     "country": "r",
  //     "date": "2023-04-19T12:47:44.831Z",
  //     "location": "Tbilisi",
  //     "description": "rr",
  //     "points": "rr",
  //     "supervisor": {
  //       "name": "rr",
  //       "company": "rr",
  //       "position": "rr"
  //     },
  //     "participants": [
  //       {
  //         "name": "rr",
  //         "company": "r",
  //         "position": "rr"
  //       }
  //     ]
  //   }
  // }
  5: { name: 'Form Five' },
};

async function getFormResponses(queryInterface, Sequelize) {
  const formResponses = await queryInterface.sequelize.query(
    'SELECT id, "formId", "createdAt" FROM "FormResponses";',
    { type: Sequelize.QueryTypes.SELECT },
  );
  return formResponses;
}

function generateAnswer(formId) {
  const form = forms[formId];
  if (!form) {
    return JSON.stringify({ id: -1, name: 'Unknown' });
  }
  return JSON.stringify(form);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formResponses = await getFormResponses(queryInterface, Sequelize);
    const formResponseAnswers = [];

    formResponses.forEach((selectedFormResponse) => {
      const { createdAt } = selectedFormResponse;
      const formResponseAnswer = {
        formResponseId: selectedFormResponse.id,
        answer: generateAnswer(selectedFormResponse.formId),
        createdAt,
        updatedAt: createdAt,
      };

      formResponseAnswers.push(formResponseAnswer);
    });

    await queryInterface.bulkInsert('FormResponseAnswers', formResponseAnswers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormResponseAnswers', null, {});
  },
};
