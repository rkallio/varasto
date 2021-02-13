import sequelize from '../sequelize.init.js';
const { Item } = sequelize.models;
import { itemns } from '../socketns.js';

export const findAll = () => {
    return Item.findAll();
};

export const findByKey = (key) => {
    return Item.strictFindByKey(key);
};

export const create = async (data) => {
    const result = await Item.create(data);
    itemns.emit('post', result);
    return result;
};

export const updateByKey = async (key, data) => {
    const result = await Item.updateByKey(key, data);
    itemns.emit('patch', result);
    return result;
};

export const deleteByKey = async (key) => {
    const result = await Item.deleteByKey(key);
    itemns.emit('delete', result);
    return result;
};
