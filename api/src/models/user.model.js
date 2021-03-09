const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const modelUtils = require('./model-utils.js');

class User extends Sequelize.Model {
  static async test(name, password, options) {
    const trx = _.get(options, 'transaction');

    const user = await User.findOne({
      where: { name },
      rejectOnEmpty: false,
      transaction: trx,
    });

    if (user === null) {
      return { ok: false, user: undefined };
    }

    const ok = await bcrypt.compare(password, user.password);

    if (ok) {
      return { ok, user };
    } else {
      return { ok: false, user: undefined };
    }
  }

  static strictFindByKey(key, options) {
    return modelUtils.strictFindByKey(User, key, options);
  }

  static updateByKey(key, data, options) {
    return modelUtils.updateByKey(User, key, data, options);
  }

  static deleteByKey(key, options) {
    return modelUtils.deleteByKey(User, key, options);
  }
}

module.exports = User;
