const Sequelize = require('sequelize');
const sequelize = require('../sequelize.init.js');
const bcrypt = require('bcrypt');
const config = require('../config.js');
const _ = require('lodash');
const utils = require('./utilities.js');

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

    static async strictFindByKey(key, options) {
        const trx = _.get(options, 'transaction');

        return User.findByPk(key, {
            transaction: trx,
            rejectOnEmpty: true,
        });
    }

    static async updateByKey(key, data, options) {
        const providedTrx = _.get(options, 'transaction');
        const trx = await utils.createOrKeepTransaction(providedTrx);

        try {
            const user = await User.strictFindByKey(key, {
                transaction: trx,
            });

            const updated = await user.update(data, {
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
            const user = await User.strictFindByKey(key, {
                transaction: trx,
            });

            const destroyed = await user.destroy({
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

User.init(
    {
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20],
            },
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 72],
            },
            set(password) {
                this.setDataValue(
                    'password',
                    bcrypt.hashSync(password, config.saltRounds)
                );
            },
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'User',
    }
);

module.exports = User;
