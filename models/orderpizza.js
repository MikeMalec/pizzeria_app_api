'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderPizza extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Pizza, Sauce }) {
      this.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
      this.belongsTo(Pizza, { foreignKey: 'pizza_id', as: 'pizza' });
      this.belongsTo(Sauce, { foreignKey: 'sauce_id', as: 'sauce' });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        order_id: undefined,
        pizza_id: undefined,
        sauce_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  OrderPizza.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
      },
      pizza_id: {
        type: DataTypes.INTEGER,
      },
      pizza_size: {
        type: DataTypes.INTEGER,
      },
      addons: {
        defaultValue: [],
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      sauce_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      sauce_size: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      breadsticks: {
        type: DataTypes.BOOLEAN,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'order_pizza',
      sequelize,
      modelName: 'OrderPizza',
    }
  );
  return OrderPizza;
};
