const sequelize = require('../sequelize.init.js');
const { User } = sequelize.models;

exports.findAll = () => {
  return User.findAll();
};

exports.findByKey = (key) => {
  return User.strictFindByKey(key);
};

exports.create = (data) => {
  return User.create(data);
};

exports.updateByKey = (key, data) => {
  return User.updateByKey(key, data);
};

exports.deleteByKey = (key) => {
  return User.deleteByKey(key);
};
