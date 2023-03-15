module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logs_tracker',
      {
        id_log: {
          type: Sequelize.BIGINT(),
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        id_user: {
          type: Sequelize.STRING(50),
          allowNull: false,
          indexedDB: true,
        },
        name_user: {
          type: Sequelize.STRING(50),
          allowNull: false,
          addIndex: true,
        },
        email_user: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        name_action: {
          type: Sequelize.STRING(50),
          allowNull: false,
          addIndex: true,
        },
        action: {
          type: Sequelize.STRING(50),
          allowNull: false,
          addIndex: true,
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

    await queryInterface.addIndex('logs_tracker', ['id_user', 'name_user', 'name_action', 'action']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logs_tracker');
  }
};
