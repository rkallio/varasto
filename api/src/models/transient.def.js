const Sequelize = require('sequelize');
const sequelize = require('../sequelize.init.js');
const Transient = require('./transient.model.js');

Transient.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },
    completed: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Transient',
  }
);
