import http from 'http';

import express from 'express';
import 'express-async-errors';

import config from './config.js';

const app = express();
const server = http.createServer(app);

import sequelize from './sequelize.init.js';
import './models/init.model.js';
await sequelize.sync();

import './services/init.service.js';

import routes from './routes/init.route.js';

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

server.listen(
    config.INVENTORY_SERVER_PORT,
    config.INVENTORY_SERVER_HOST);
