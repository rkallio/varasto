import sequelize from '../sequelize.init.js';
const { Item } = sequelize.models;

export const findAll = () => {
    return Item.findAll();
};

export const findByKey = (key) => {
    return Item.strictFindByKey(key);
};

export const create = (data) => {
    return Item.create(data);
};

export const updateByKey = (key, data) => {
    return Item.updateByKey(key, data);
};

export const deleteByKey = (key) => {
    return Item.deleteByKey(key);
};
