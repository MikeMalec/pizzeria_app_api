'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    getSignedJwtToken() {
      return jwt.sign({ id: this.get().id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    }

    async matchPassword(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.get().password);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Use real email',
          },
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [6, 250],
        },
      },
      user_type: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      tableName: 'users',
      hooks: {
        beforeSave: async (user, options) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
