import Sequelize from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize({
    dialect: config.dbDialect,
    storage: config.dbStorage,
    logging: config.dbLogging,
});

export default sequelize;
