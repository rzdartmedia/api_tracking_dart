module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('track_action_amounts',
      {
        id_track_amount: {
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
        action_amount: {
          type: Sequelize.BIGINT(),
          allowNull: false,
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

    await queryInterface.addIndex('track_action_amounts', ['id_user', 'name_action', 'action']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('track_action_amounts');
  }
};
