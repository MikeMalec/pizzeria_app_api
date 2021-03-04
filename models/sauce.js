'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sauce extends Model {
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
  Sauce.init(
    {
      name: DataTypes.STRING,
      small_price: DataTypes.FLOAT,
      big_price: DataTypes.FLOAT,
    },
    {
      tableName: 'sauces',
      sequelize,
      modelName: 'Sauce',
    }
  );
  return Sauce;
};
