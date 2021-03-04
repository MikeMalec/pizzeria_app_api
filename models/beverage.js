'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beverage extends Model {
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
  Beverage.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['cold', 'hot', 'alcohol'],
      },
      alcohol_type: {
        type: DataTypes.ENUM,
        values: ['normal', 'draught', 'bottled', 'wine', 'canned'],
      },
      size: {
        type: DataTypes.STRING,
      },
      small_price: {
        type: DataTypes.FLOAT,
      },
      big_price: {
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      orderable: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Beverage',
      tableName: 'beverages',
    }
  );
  return Beverage;
};
