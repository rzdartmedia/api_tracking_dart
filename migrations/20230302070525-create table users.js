const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users',
      {
        id_user: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
          addIndex: true,
        },
        no_handphone: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        fcm_token: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      }
    );

    await queryInterface.addIndex('users', ['name', 'email']);

    await queryInterface.bulkInsert('users', [
      {
        id_user: 'user-000001',
        name: 'Admin Dart 1',
        email: 'admindartmedia@gmail.com',
        no_handphone: '081245612345',
        password: await bcrypt.hash('Admindartmedia123', 10),
      },
      {
        id_user: 'user-000002',
        name: 'Admin Dart 2',
        email: 'admindartmedia2@gmail.com',
        no_handphone: '081245612346',
        password: await bcrypt.hash('Admindartmedia124', 10),
      },
      {
        id_user: 'user-000003',
        name: 'Admin Dart 3',
        email: 'admindartmedia3@gmail.com',
        no_handphone: '081245612347',
        password: await bcrypt.hash('Admindartmedia124', 10),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { id_user: 'user-000003' });
    await queryInterface.bulkDelete('users', { id_user: 'user-000002' });
    await queryInterface.bulkDelete('users', { id_user: 'user-000001' });
    await queryInterface.dropTable('users');
  }
};
