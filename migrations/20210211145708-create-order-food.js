'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      food_type: {
        type: Sequelize.ENUM,
        values: ['burger', 'pasta', 'pita', 'salad', 'beverage'],
      },
      food_id: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.ENUM,
        values: ['small', 'big', 'normal'],
      },
      amount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('order_food');
  },
};
