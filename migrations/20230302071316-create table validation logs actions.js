module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('validation_logs_action',
      {
        id_validation: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
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
        many_times: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        channel: {
          type: Sequelize.JSON,
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

    await queryInterface.addIndex('validation_logs_action', ['name_action', 'action', 'many_times']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('validation_logs_action');
  }
};
