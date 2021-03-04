'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Pasta, Pita, Salad, Beverage, Burger }) {
      this.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
      this.belongsTo(Burger, { foreignKey: 'food_id', as: 'burger' });
      this.belongsTo(Pasta, { foreignKey: 'food_id', as: 'pasta' });
      this.belongsTo(Pita, { foreignKey: 'food_id', as: 'pita' });
      this.belongsTo(Salad, { foreignKey: 'food_id', as: 'salad' });
      this.belongsTo(Beverage, { foreignKey: 'food_id', as: 'beverage' });
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  OrderFood.init(
    {
      order_id: DataTypes.INTEGER,
      food_type: {
        type: DataTypes.ENUM,
        values: ['burger', 'pasta', 'pita', 'salad', 'beverage'],
      },
      food_id: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.ENUM,
        values: ['small', 'big', 'normal'],
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'order_food',
      sequelize,
      modelName: 'OrderFood',
    }
  );
  return OrderFood;
};
