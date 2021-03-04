'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pizzas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      ingredients: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      size_24_price: {
        type: Sequelize.FLOAT,
      },
      size_30_price: {
        type: Sequelize.FLOAT,
      },
      size_40_price: {
        type: Sequelize.FLOAT,
      },
      size_50_price: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('pizzas');
  },
};
