const Sequelize = require('sequelize');
const { Model } = Sequelize;
const sequelize = require('../sequelize.init.js');
const _ = require('lodash');
const utils = require('./utilities.js');

class Item extends Model {
    static async strictFindByKey(key, options) {
        const providedTrx = _.get(options, 'transaction');
        const trx = await utils.createOrKeepTransaction(providedTrx);

        try {
            const item = await Item.findByPk(key, {
                transaction: trx,
                rejectOnEmpty: true,
            });

            await utils.commitOrKeepTransaction({
                provided: providedTrx,
                used: trx,
            });

            return item;
        } catch (error) {
            await utils.rollbackOrKeepTransaction({
                provided: providedTrx,
                used: trx,
            });
            throw error;
        }
    }

    static async updateByKey(key, data, options) {
        const providedTrx = _.get(options, 'transaction');
        const trx = await utils.createOrKeepTransaction(providedTrx);

        try {
            const item = await Item.strictFindByKey(key, {
                transaction: trx,
            });

            const updated = await item.update(data, {
                transaction: trx,
            });
            await utils.commitOrKeepTransaction({
                provided: providedTrx,
                used: trx,
            });

            return updated;
        } catch (error) {
            await utils.rollbackOrKeepTransaction({
                provided: providedTrx,
                used: trx,
            });
            throw error;
        }
    }

    static async deleteByKey(key, options) {
        const providedTrx = _.get(options, 'transaction');
        const trx = await utils.createOrKeepTransaction(providedTrx);

        try {
            const item = await Item.strictFindByKey(key, {
                transaction: trx,
            });

            const destroyed = await item.destroy({
                transaction: trx,
            });
            await utils.commitOrKeepTransaction({
                provided: providedTrx,
                used: trx,
            });
            return destroyed;
        } catch (error) {
            await utils.rollbackOrKeepTransaction({
                provided: providedTrx,
                used: trx,
            });
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
                if (
                    this.measure === '%' &&
                    this.targetQuantity !== 100
                ) {
                    throw new Error(
                        'Target Quantity should be hundred when measure is set to %'
                    );
                }
            },
        },
    }
);

module.exports = Item;
