import Sequelize from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize({
    dialect: config.INVENTORY_DB_DIALECT,
    storage: config.INVENTORY_DB_STORAGE
});

export default sequelize;
