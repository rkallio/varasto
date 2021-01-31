import sequelize from '../sequelize.init.js';
const { User } = sequelize.models;

export const findAll = () => {
    return User.findAll();
};

export const findByKey = (key) => {
    return User.strictFindByKey(key);
};

export const create = (data) => {
    return User.create(data);
};

export const updateByKey = (key, data) => {
    return User.updateByKey(key, data);
};

export const deleteByKey = (key) => {
    return User.deleteByKey(key);
};
