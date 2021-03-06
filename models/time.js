'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Time extends Model {
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
  Time.init(
    {
      time: DataTypes.INTEGER,
    },
    {
      tableName: 'time',
      sequelize,
      modelName: 'Time',
    }
  );
  return Time;
};
