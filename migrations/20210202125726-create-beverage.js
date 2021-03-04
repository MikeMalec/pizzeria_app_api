'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('beverages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['cold', 'hot', 'alcohol'],
      },
      alcohol_type: {
        allowNull: true,
        type: Sequelize.ENUM,
        values: ['normal', 'draught', 'bottled', 'wine', 'canned'],
      },
      size: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      small_price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      big_price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      ingredients: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      orderable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('beverages');
  },
};
