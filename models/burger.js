'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Burger extends Model {
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
  Burger.init(
    {
      number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      ingredients: DataTypes.ARRAY(DataTypes.TEXT),
      solo_price: DataTypes.FLOAT,
      set_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Burger',
      tableName: 'burgers',
    }
  );
  return Burger;
};
