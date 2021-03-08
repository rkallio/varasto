const sequelize = require('../sequelize.init.js');
const EventEmitter = require('events');

const { Item } = sequelize.models;

const emitter = new EventEmitter();

exports.emitter = emitter;

exports.findAll = () => {
  return Item.findAll();
};

exports.findByKey = (key) => {
  return Item.strictFindByKey(key);
};

exports.create = async (data) => {
  const result = await Item.create(data);
  emitter.emit('create', result);
  return result;
};

exports.updateByKey = async (key, data) => {
  const result = await Item.updateByKey(key, data);
  emitter.emit('update', result);
  return result;
};

exports.deleteByKey = async (key) => {
  const result = await Item.deleteByKey(key);
  emitter.emit('delete', result);
  return result;
};
