'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pizza extends Model {
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
  Pizza.init(
    {
      number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      ingredients: DataTypes.ARRAY(DataTypes.TEXT),
      size_24_price: DataTypes.FLOAT,
      size_30_price: DataTypes.FLOAT,
      size_40_price: DataTypes.FLOAT,
      size_50_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Pizza',
      tableName: 'pizzas',
    }
  );
  return Pizza;
};
