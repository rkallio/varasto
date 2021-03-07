const Sequelize = require('sequelize');
const { Model, Op } = Sequelize;
const sequelize = require('../sequelize.init.js');
const _ = require('lodash');
const utils = require('./utilities.js');

class Transient extends Model {
  static async strictFindByKey(key, options) {
    const providedTrx = _.get(options, 'transaction');
    const trx = await utils.createOrKeepTransaction(providedTrx);

    try {
      const item = await Transient.findByPk(key, {
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
      const item = await Transient.strictFindByKey(key, {
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
      const item = await Transient.strictFindByKey(key, {
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

  static async deleteOlderThan(time, options) {
    const providedTrx = _.get(options, 'transaction');
    const trx = await utils.createOrKeepTransaction(providedTrx);

    let toDelete;

    try {
      toDelete = await Transient.findAll({
        where: {
          updatedAt: {
            [Op.lt]: time,
          },
        },
        transaction: trx,
      });
    } catch (error) {
      await utils.rollbackOrKeepTransaction({
        provided: providedTrx,
        used: trx,
      });
      throw error;
    }

    try {
      await Transient.destroy({
        where: {
          updatedAt: {
            [Op.lt]: time,
          },
        },
        transaction: trx,
      });
    } catch (error) {
      await utils.rollbackOrKeepTransaction({
        provided: providedTrx,
        used: trx,
      });
      throw error;
    }

    await utils.commitOrKeepTransaction({
      provided: providedTrx,
      used: trx,
    });
    return toDelete;
  }
}

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

module.exports = Transient;
