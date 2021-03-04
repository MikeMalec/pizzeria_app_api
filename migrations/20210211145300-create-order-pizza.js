'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_pizza', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      pizza_id: {
        type: Sequelize.INTEGER,
      },
      pizza_size: {
        type: Sequelize.INTEGER,
      },
      addons: {
        defaultValue: [],
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      sauce_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      sauce_size: {
        allowNull: true,
        type: Sequelize.ENUM,
        values: ['small', 'big'],
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      breadsticks: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_pizza');
  },
};
