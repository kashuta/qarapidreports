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
    await queryInterface.bulkInsert('Users', [
      {
        userName: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('password', 10),
        isActive: true,
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'manager',
        email: 'manager@example.com',
        password: await bcrypt.hash('password', 10),
        isActive: true,
        roleId: managerRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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

    // Get created users
    const users = await queryInterface.sequelize.query('SELECT id, email FROM "Users";', {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    // Create email verification tokens
    await queryInterface.bulkInsert('EmailVerificationTokens', users.map((user) => ({
      userId: user.id,
      token: `some_token_${user.email.split('@')[0]}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmailVerificationTokens', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
