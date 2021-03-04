'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salad extends Model {
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
  Salad.init(
    {
      number: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Salad',
      tableName: 'salads',
    }
  );
  return Salad;
};
