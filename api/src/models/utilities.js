const sequelize = require('../sequelize.init.js');

exports.createOrKeepTransaction = (trx) => {
    if (trx) {
        return sequelize.transaction();
    } else {
        return trx;
    }
};

exports.commitOrKeepTransaction = ({ provided, used }) => {
    if (provided !== used) {
        return used.commit();
    } else {
        return provided;
    }
};

exports.rollbackOrKeepTransaction = ({ provided, used }) => {
    if (provided !== used) {
        return used.rollback();
    } else {
        return provided;
    }
};
