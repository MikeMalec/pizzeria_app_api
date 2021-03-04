'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PizzaAddon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  PizzaAddon.init(
    {
      name: DataTypes.STRING,
      price_24: DataTypes.FLOAT,
      price_30: DataTypes.FLOAT,
      price_40: DataTypes.FLOAT,
      price_50: DataTypes.FLOAT,
    },
    {
      tableName: 'pizza_addons',
      sequelize,
      modelName: 'PizzaAddon',
    }
  );
  return PizzaAddon;
};
