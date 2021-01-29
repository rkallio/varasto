import Sequelize from 'sequelize';
const { Model } = Sequelize;
import sequelize from '../sequelize.init.js';

class Item extends Model { }

Item.init({
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: 'name-location-composite',
        validate: {
            len: [3, 20]
        },
    },
    location: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: 'name-location-composite',
        validate: {
            len: [3, 20]
        }
    },
    quantity: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'Item'
});

export default Item;
