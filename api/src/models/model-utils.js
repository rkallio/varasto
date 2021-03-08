const utils = require('./utilities.js');
const _ = require('lodash');

exports.strictFindByKey = async (Model, key, options) => {
  const providedTrx = _.get(options, 'transaction');
  const trx = await utils.createOrKeepTransaction(providedTrx);

  try {
    const instance = await Model.findByPk(key, {
      transaction: trx,
      rejectOnEmpty: true,
    });

    await utils.commitOrKeepTransaction({
      provided: providedTrx,
      used: trx,
    });

    return instance;
  } catch (error) {
    await utils.rollbackOrKeepTransaction({
      provided: providedTrx,
      used: trx,
    });
    throw error;
  }
};

exports.updateByKey = async (Model, key, data, options) => {
  const providedTrx = _.get(options, 'transaction');
  const trx = await utils.createOrKeepTransaction(providedTrx);

  try {
    const instance = await Model.strictFindByKey(key, {
      transaction: trx,
    });

    const updated = await instance.update(data, {
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
};

exports.deleteByKey = async (Model, key, options) => {
  const providedTrx = _.get(options, 'transaction');
  const trx = await utils.createOrKeepTransaction(providedTrx);

  try {
    const instance = await Model.strictFindByKey(key, {
      transaction: trx,
    });

    const destroyed = await instance.destroy({
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
};
