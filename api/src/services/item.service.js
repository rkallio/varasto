const sequelize = require('../sequelize.init.js');
const { Item } = sequelize.models;
const { itemns } = require('../socketns.js');

exports.findAll = () => {
    return Item.findAll();
};

exports.findByKey = (key) => {
    return Item.strictFindByKey(key);
};

exports.create = async (data) => {
    const result = await Item.create(data);
    itemns.emit('post', result);
    return result;
};

exports.updateByKey = async (key, data) => {
    const result = await Item.updateByKey(key, data);
    itemns.emit('patch', result);
    return result;
};

exports.deleteByKey = async (key) => {
    const result = await Item.deleteByKey(key);
    itemns.emit('delete', result);
    return result;
};
