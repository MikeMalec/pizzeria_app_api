'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pita extends Model {
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
  Pita.init(
    {
      number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      ingredients: DataTypes.ARRAY(DataTypes.TEXT),
      small_price: DataTypes.FLOAT,
      big_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Pita',
      tableName: 'pita',
    }
  );
  return Pita;
};
