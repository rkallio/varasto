const sequelize = require('../sequelize.init.js');
const { Transient } = sequelize.models;
const { transientns } = require('../socketns.js');
const ns = transientns;

exports.findAll = () => {
  return Transient.findAll();
};

exports.findByKey = (key) => {
  return Transient.strictFindByKey(key);
};

exports.create = async (data) => {
  const result = await Transient.create(data);
  ns.emit('post', result);
  return result;
};

exports.updateByKey = async (key, data) => {
  const result = await Transient.updateByKey(key, data);
  ns.emit('patch', result);
  return result;
};

exports.deleteByKey = async (key) => {
  const result = await Transient.deleteByKey(key);
  ns.emit('delete', result);
  return result;
};

exports.deleteOlderThan = async (time) => {
  const result = await Transient.deleteOlderThan(time);
  ns.emit('deleteMany', result);
  return result;
};
