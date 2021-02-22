import sequelize from '../sequelize.init.js';
const { Transient } = sequelize.models;
import { transientns as ns } from '../socketns.js';

export const findAll = () => {
    return Transient.findAll();
};

export const findByKey = (key) => {
    return Transient.strictFindByKey(key);
};

export const create = async (data) => {
    const result = await Transient.create(data);
    ns.emit('post', result);
    return result;
};

export const updateByKey = async (key, data) => {
    const result = await Transient.updateByKey(key, data);
    ns.emit('patch', result);
    return result;
};

export const deleteByKey = async (key) => {
    const result = await Transient.deleteByKey(key);
    ns.emit('delete', result);
    return result;
};

export const deleteOlderThan = async (time) => {
    const result = await Transient.deleteOlderThan(time);
    ns.emit('deleteMany', result);
    return result;
};
