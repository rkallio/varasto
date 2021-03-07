const Sequelize = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize({
    dialect: config.dbDialect,
    storage: config.dbStorage,
    logging: config.dbLogging,
});

module.exports = sequelize;
