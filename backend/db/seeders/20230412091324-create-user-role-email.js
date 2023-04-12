const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create roles
    await queryInterface.bulkInsert('Roles', [
      {
        admin: true, manager: false, inspector: false, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        admin: false, manager: true, inspector: false, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        admin: false, manager: false, inspector: true, createdAt: new Date(), updatedAt: new Date(),
      },
    ]);

    // Find created roles
    const adminRole = await queryInterface.rawSelect('Roles', { where: { admin: true } }, ['id']);
    const managerRole = await queryInterface.rawSelect('Roles', { where: { manager: true } }, ['id']);
    const inspectorRole = await queryInterface.rawSelect('Roles', { where: { inspector: true } }, ['id']);

    // Create users
    const adminUser = await queryInterface.bulkInsert('Users', [{
      userName: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('password', 10),
      isActive: true,
      roleId: adminRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    const managerUser = await queryInterface.bulkInsert('Users', [{
      userName: 'manager',
      email: 'manager@example.com',
      password: await bcrypt.hash('password', 10),
      isActive: true,
      roleId: managerRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    const inspectorUsers = await queryInterface.bulkInsert('Users', [
      {
        userName: 'inspector1',
        email: 'inspector1@example.com',
        password: await bcrypt.hash('password', 10),
        isActive: true,
        roleId: inspectorRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'inspector2',
        email: 'inspector2@example.com',
        password: await bcrypt.hash('password', 10),
        isActive: true,
        roleId: inspectorRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'inspector3',
        email: 'inspector3@example.com',
        password: await bcrypt.hash('password', 10),
        isActive: true,
        roleId: inspectorRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create email verification tokens
    await queryInterface.bulkInsert('EmailVerificationTokens', [
      {
        userId: adminUser[0],
        token: 'some_admin_token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: managerUser[0],
        token: 'some_manager_token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...inspectorUsers.map((user, index) => ({
        userId: user,
        token: `some_inspector_token_inspector${index + 1}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmailVerificationTokens', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
