const Sequelize = require('sequelize');
const sequelize = require('../sequelize.init.js');
const Item = require('./item.model.js');

Item.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: 'name-location-composite',
      validate: {
        len: [3, 20],
      },
    },
    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: 'name-location-composite',
      validate: {
        len: [3, 20],
      },
    },
    currentQuantity: {
      type: Sequelize.DataTypes.REAL,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    targetQuantity: {
      type: Sequelize.DataTypes.REAL,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    measure: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pcs', 'mass', 'volume', '%']],
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Item',
    validate: {
      targetQuantity100WhenMeasureIsPercent() {
        if (this.measure === '%' && this.targetQuantity !== 100) {
          throw new Error(
            'Target Quantity should be hundred when measure is set to %'
          );
        }
      },
    },
  }
);
