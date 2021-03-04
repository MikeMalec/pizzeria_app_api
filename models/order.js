'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderPizza, OrderFood }) {
      this.hasMany(OrderPizza, { foreignKey: 'order_id', as: 'pizza' });
      this.hasMany(OrderFood, { foreignKey: 'order_id', as: 'food' });
    }
  }
  Order.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: ['new', 'accepted', 'canceled'],
      },
      street: DataTypes.STRING,
      house_number: DataTypes.STRING,
      city: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      price: DataTypes.STRING,
      additional_user_info: DataTypes.STRING,
      payment_method: {
        type: DataTypes.ENUM,
        values: ['cart', 'cash'],
      },
      stripe_intent_id: DataTypes.STRING,
      payment_status: {
        type: DataTypes.ENUM,
        values: ['processing', 'succeeded', 'failed'],
      },
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: 'orders',
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
