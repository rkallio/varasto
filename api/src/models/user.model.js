import Sequelize from 'sequelize';
import sequelize from '../sequelize.init.js';
import bcrypt from 'bcrypt';
import config from '../config.js';
import _ from 'lodash';

class User extends Sequelize.Model {
    static async test(name, password, options) {
        const trx = _.get(options, 'transaction');

        const user = await User.findOne({
            where: { name },
            rejectOnEmpty: false,
            transaction: trx
        });

        console.log(user);

        if(user === null) {
            return { ok: false,
                     user: undefined };
        }

        const ok = await bcrypt.compare(password, user.password);

        if(ok) {
            return { ok, user };
        } else {
            return { ok: false, user: undefined };
        }
    }

    static async strictFindByKey(key, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const user = await User.findByPk(key, {
                transaction: transaction,
                rejectOnEmpty: true,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return user;
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }
    }

    static async updateByKey(key, data, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const user = await User.strictFindByKey(key, {
                transaction: transaction,
            });

            const updated = await user.update(data, {
                transaction: transaction,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return updated;
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }
    }

    static async deleteByKey(key, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const user = await User.strictFindByKey(key, {
                transaction: transaction,
            });

            const destroyed = await user.destroy({
                transaction: transaction,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return destroyed;
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
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
