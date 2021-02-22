import Sequelize from 'sequelize';
const { Model, Op } = Sequelize;
import sequelize from '../sequelize.init.js';
import _ from 'lodash';

class Transient extends Model {
    static async strictFindByKey(key, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        try {
            const item = await Transient.findByPk(key, {
                transaction: transaction,
                rejectOnEmpty: true,
            });
            if (transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return item;
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
            const item = await Transient.strictFindByKey(key, {
                transaction: transaction,
            });

            const updated = await item.update(data, {
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
            const item = await Transient.strictFindByKey(key, {
                transaction: transaction,
            });

            const destroyed = await item.destroy({
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

    static async deleteOlderThan(time, options) {
        const transaction = _.get(options, 'transaction')
            ? options.transaction
            : await sequelize.transaction();

        let toDelete;

        try {
            toDelete = await Transient.findAll({
                where: {
                    updatedAt: {
                        [Op.lt]: time,
                    },
                },
                transaction,
            });
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }

        try {
            await Transient.destroy({
                where: {
                    updatedAt: {
                        [Op.lt]: time,
                    },
                },
                transaction,
            });
        } catch (error) {
            if (transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }

        if (transaction !== _.get(options, 'transaction')) {
            transaction.commit();
        }
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

export default Transient;
