const Sequelize = require('sequelize');
const _ = require('lodash');
const utils = require('./utilities.js');
const modelUtils = require('./model-utils.js');

const { Model, Op } = Sequelize;

class Transient extends Model {
  static async strictFindByKey(key, options) {
    return modelUtils.strictFindByKey(Transient, key, options);
  }

  static updateByKey(key, data, options) {
    return modelUtils.updateByKey(Transient, key, data, options);
  }

  static deleteByKey(key, options) {
    return modelUtils.deleteByKey(Transient, key, options);
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

module.exports = Transient;
