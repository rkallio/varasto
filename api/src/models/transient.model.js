const Sequelize = require('sequelize');
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

  static async deleteInstancesOlderThan(time, options) {
    const providedTrx = options?.transaction;
    const trx = await utils.createOrKeepTransaction(providedTrx);

    try {
      const toDelete = await Transient.findAll({
        where: {
          updatedAt: {
            [Op.lt]: time,
          },
        },
        transaction: trx,
      });

      await Transient.destroy({
        where: {
          updatedAt: {
            [Op.lt]: time,
          },
        },
        transaction: trx,
      });

      await utils.commitOrKeepTransaction({
        provided: providedTrx,
        used: trx,
      });

      return toDelete;
    } catch (error) {
      await utils.rollbackOrKeepTransaction({
        provided: providedTrx,
        used: trx,
      });
      throw error;
    }
  }
}

module.exports = Transient;
