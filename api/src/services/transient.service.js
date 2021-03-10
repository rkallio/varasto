const sequelize = require('../sequelize.init.js');
const EventEmitter = require('events');

const { Transient } = sequelize.models;

const emitter = new EventEmitter();

exports.emitter = emitter;

exports.findAll = () => {
  return Transient.findAll();
};

exports.findByKey = (key) => {
  return Transient.strictFindByKey(key);
};

exports.create = async (data) => {
  const result = await Transient.create(data);
  emitter.emit('create', result);
  return result;
};

exports.updateByKey = async (key, data) => {
  const result = await Transient.updateByKey(key, data);
  emitter.emit('update', result);
  return result;
};

exports.deleteByKey = async (key) => {
  const result = await Transient.deleteByKey(key);
  emitter.emit('delete', result);
  return result;
};

exports.deleteOlderThan = async (time) => {
  const result = await Transient.deleteInstancesOlderThan(time);
  emitter.emit('delete-many', result);
  return result;
};
