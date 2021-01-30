import { Model } from Sequelize;
import _ from 'lodash';

export default class BaseModel extends Model {
    static async strictFindByKey(key, options) {
        const transaction = _.get(options, 'transaction')
              ? options.transaction
              : await sequelize.transaction();

        try {
            const item = await Item.findByPk(key, {
                transaction: transaction,
                rejectOnEmpty: true
            });
            if(transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return item;
        } catch(error) {
            if(transaction !== _.get(options, 'transaction')) {
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
            const item = await Item.strictFindByKey(key, {
                transaction: transaction,
            });

            const updated = await item.update(data, {
                transaction: transaction
            });
            if(transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return updated;
        } catch(error) {
            if(transaction !== _.get(options, 'transaction')) {
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
            const item = await Item.strictFindByKey(key, {
                transaction: transaction,
            });

            const destroyed = await item.destroy({
                transaction: transaction
            });
            if(transaction !== _.get(options, 'transaction')) {
                transaction.commit();
            }
            return destroyed;
        } catch(error) {
            if(transaction !== _.get(options, 'transaction')) {
                transaction.rollback();
            }
            throw error;
        }
    }
}
