const Sequelize = require('sequelize');
const _ = require('lodash');
const utils = require('./utilities.js');

const { Model } = Sequelize;

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

module.exports = Item;
