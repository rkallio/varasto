import Sequelize from 'sequelize';
import BaseModel from './base.model.js';
import sequelize from '../sequelize.init.js';

class Item extends BaseModel {}

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
    },
    {
        sequelize,
        underscored: true,
        modelName: 'Item',
    }
);

export default Item;
