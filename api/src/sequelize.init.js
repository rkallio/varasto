import Sequelize from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize({
    dialect: config.dbDialect,
    storage: config.dbStorage
});

export default sequelize;
