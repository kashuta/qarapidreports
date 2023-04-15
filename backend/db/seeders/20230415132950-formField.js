'use strict';

const createFormField = (id, formId, label, type, order, formSectionId) => {
  return {
    id,
    formId,
    label,
    type,
    order,
    formSectionId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formFieldsData = [
      createFormField(1, 1, 'All field service vehicles inspection completed as per schedule?', 'checkbox', 1, 1),
      createFormField(2, 1, 'All PPE is in good condition and suitable for task?', 'checkbox', 2, 1),
      createFormField(3, 1, 'All vehicles have OXY inspection tag up to date?', 'checkbox', 3, 1),
      createFormField(4, 1, 'All materials used for work are stored correctly?', 'checkbox', 4, 1),
      createFormField(5, 1, 'All H2S detectors are working properly?', 'checkbox', 5, 1),
      createFormField(6, 1, 'IVMS, blue key system are working without any problems?', 'checkbox', 6, 1),
      createFormField(7, 1, 'Are all HSE training cards for each employee are carried by employee and up to date?', 'checkbox', 7, 1),
      createFormField(8, 1, 'Do all employees have their own blue key?', 'checkbox', 8, 1),
      createFormField(9, 1, 'Is housekeeping in workshop and store acceptable?', 'checkbox', 9, 1),
      createFormField(10, 1, 'Are chemical ontainers identified and stored on top of spill retention pallets?', 'checkbox', 10, 1),
      createFormField(11, 1, 'Is preventive maintenance of PCM machines up to date?', 'checkbox', 11, 1),
      createFormField(12, 1, 'Is calibration for all measuring tools valid?', 'checkbox', 12, 1),
      createFormField(13, 1, 'Have you checked JSAs to ensure they are still valid?', 'checkbox', 13, 1),
      
      createFormField(15, 2, 'All vehicle lights are functioning?', 'checkbox', 1, 1),
      createFormField(16, 2, 'Vehicle monitoring system (IVMS) is ok?', 'checkbox', 2, 1),
      createFormField(17, 2, 'Brake fluid level is ok?', 'checkbox', 3, 1),
      createFormField(18, 2, 'Engine oil level is ok?', 'checkbox', 4, 1),
      createFormField(19, 2, 'Radiator coolant level is ok?', 'checkbox', 5, 1),
      createFormField(20, 2, 'Windshield wiper/Washer fluid is ok?', 'checkbox', 6, 1),
      createFormField(21, 2, 'Drinking water available inside?', 'checkbox', 7, 1),
      createFormField(22, 2, 'Tire Pressure (including spare) is ok?', 'checkbox', 8, 1),
      createFormField(23, 2, 'Fire extinguisher is available and pressurized?', 'checkbox', 9, 1),
      createFormField(24, 2, 'First aid kit is available and contents not expired?', 'checkbox', 10, 1),
      createFormField(25, 2, 'Reflective jacket is available?', 'checkbox', 11, 1),
      createFormField(26, 2, 'Reflective triangle is available?', 'checkbox', 12, 1),
      createFormField(27, 2, 'Jack and wheel wrench are available?', 'checkbox', 13, 1),
      createFormField(28, 2, 'OXY inspection sticker is valid?', 'checkbox', 14, 1),
      createFormField(29, 2, 'Maintenance status is ok?', 'checkbox', 15, 1),
      
      createFormField(30, 3, 'Fuel; Leaks, Level', 'checkbox', 1, 1),
      createFormField(31, 3, 'Hydraulic Oil; Leaks, Level', 'checkbox', 2, 1),
      createFormField(32, 3, 'Engine Oil; Leaks, Level', 'checkbox', 3, 1),
      createFormField(33, 3, 'Radiator Coolant; Leaks, Level', 'checkbox', 4, 1),
      createFormField(34, 3, 'Transmission Fluid; Leaks, Level', 'checkbox', 5, 1),
      createFormField(35, 3, 'Tires; Condition and Pressure', 'checkbox', 6, 1),
      createFormField(36, 3, 'Forks; Visual Check', 'checkbox', 7, 1),
      createFormField(37, 3, 'Mast Chains and hoses; Visual Check, Leaks, Damage', 'checkbox', 8, 1),
      createFormField(38, 3, 'Overhead Guard; Attached, Damage', 'checkbox', 9, 1),
      createFormField(39, 3, 'Battery; Check Condition', 'checkbox', 10, 1),
      createFormField(40, 3, 'Engine Belt; Cracked, Damage, Visual Check', 'checkbox', 11, 1),
      createFormField(41, 3, 'Air filter; Visually check condition', 'checkbox', 12, 1),
      createFormField(42, 3, 'Service Brake; Functioning Smoothly and Properly', 'checkbox', 13, 1),
      createFormField(43, 3, 'Parking Brake; Functioning Smoothly and Properly', 'checkbox', 14, 1),
      createFormField(44, 3, 'Steering Operation; Functioning Smoothly and Properly', 'checkbox', 15, 1),
      createFormField(45, 3, 'Drive Control – Forward/Reverse; Functioning Smoothly and Properly', 'checkbox', 16, 1),
      createFormField(46, 3, 'Tilt Control – Forward and Back; Functioning Smoothly and Properly', 'checkbox', 17, 1),
      createFormField(47, 3, 'Hoist and Lowering Control; Functioning Smoothly and Properly', 'checkbox', 18, 1),
      createFormField(48, 3, 'Horn and Lights; Functioning Properly', 'checkbox', 19, 1),
      createFormField(49, 3, 'Gauges: Speed, Oil, Hours, Fuel, Temp; Functioning Properly', 'checkbox', 20, 1),
      
      createFormField(50, 4, 'Unsafe act', 'checkbox', 1, 1),
      createFormField(51, 4, 'Unsafe condition', 'checkbox', 2, 1),
      createFormField(52, 4, 'Health hazard', 'checkbox', 3, 1),
      createFormField(53, 4, 'Environmental risk', 'checkbox', 4, 1),
      createFormField(54, 4, 'Safe observation', 'checkbox', 5, 1)
    
    ];
    
    await queryInterface.bulkInsert('FormFields', formFieldsData);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FormFields', null, {});
  },
};
