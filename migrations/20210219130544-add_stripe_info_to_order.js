'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('orders', 'stripe_intent_id', {
      type: Sequelize.STRING,
    });
    // ['processing', 'succeeded', 'failed']
    await queryInterface.addColumn('orders', 'payment_status', {
      type: Sequelize.STRING,
      defaultValue: 'processing',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('orders', 'stripe_intent_id');
    await queryInterface.removeColumn('orders', 'payment_status');
  },
};
