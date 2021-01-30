import sequelize from '../sequelize.init.js';
const { Item } = sequelize.models;

export const findAll = () => {
    return Item.findAll();
};

export const findByKey = (key) => {
    return Item.findByPk(key, {
        rejectOnEmpty: true,
    });
};

export const create = (data) => {
    return Item.create(data);
};

export const updateByKey = (key, data) => {
    const updated = sequelize.transaction(async (t) => {
        const item = await Item.findByPk(key, {
            transaction: t,
            rejectOnEmpty: true,
        });
        const updated = item.update(data, {
            transaction: t,
        });
        return updated;
    });
    return updated;
};

export const deleteByKey = (key) => {
    const deleted = sequelize.transaction(async (t) => {
        const item = await Item.findByPk(key, {
            transaction: t,
            rejectOnEmpty: t,
        });
        return item.destroy({
            transaction: t,
        });
    });
    return deleted;
};
