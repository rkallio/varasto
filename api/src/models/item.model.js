const Sequelize = require('sequelize');
const modelUtils = require('./model-utils.js');

const { Model } = Sequelize;

class Item extends Model {
  static strictFindByKey(key, options) {
    return modelUtils.strictFindByKey(Item, key, options);
  }

  static updateByKey(key, data, options) {
    return modelUtils.updateByKey(Item, key, data, options);
  }

  static deleteByKey(key, options) {
    return modelUtils.deleteByKey(Item, key, options);
  }
}

module.exports = Item;
