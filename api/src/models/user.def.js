const Sequelize = require('sequelize');
const sequelize = require('../sequelize.init.js');
const config = require('../config.js');
const User = require('./user.model.js');
const bcrypt = require('bcrypt');

User.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 72],
      },
      set(password) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(password, config.saltRounds)
        );
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'User',
  }
);
