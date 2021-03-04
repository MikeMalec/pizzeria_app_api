'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(
      "ALTER TYPE enum_beverages_alcohol_type ADD VALUE 'canned'"
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(
      'DELETE FROM enum_beverages_alcohol_type ' +
        "WHERE enumlabel = 'canned' " +
        "AND enumtypid = ( SELECT oid FROM pg_type WHERE typname = 'enum_beverages_alcohol_type')"
    );
  },
};
