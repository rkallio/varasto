import Sequelize from 'sequelize';
const { Model } = Sequelize;
import sequelize from '../sequelize.init.js';
import _ from 'lodash';

class Item extends Model {
    static async strictFindByKey(key, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const item = await Item.findByPk(key, {
                transaction: transaction,
                rejectOnEmpty: true,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return item;
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }
    }

    static async updateByKey(key, data, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const item = await Item.strictFindByKey(key, {
                transaction: transaction,
            });

            const updated = await item.update(data, {
                transaction: transaction,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return updated;
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }
    }

    static async deleteByKey(key, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const item = await Item.strictFindByKey(key, {
                transaction: transaction,
            });

            const destroyed = await item.destroy({
                transaction: transaction,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return destroyed;
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }
    }
}

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
                isIn: [['pcs', 'mass', 'volume']]
            }
        }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'Item',
    }
);

export default Item;
