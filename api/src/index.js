import http from 'http';

import express from 'express';
import 'express-async-errors';

import config from './config.js';

const app = express();
const server = http.createServer(app);

import Sequelize from 'sequelize';
import sequelize from './sequelize.init.js';
import './models/init.model.js';
await sequelize.sync();

import './services/init.service.js';

import routes from './routes/init.route.js';

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

// sequelize handlers
app.use((error, request, response, next) => {
    if(error instanceof Sequelize.EmptyResultError) {
        return response.status(404).json({
            error: 'Not Found',
            message: 'Resource not found',
            context: null
        });
    }
    return next(error);
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not Found',
        message: 'Resource not found',
        context: null
    });
});

server.listen(
    config.port,
    config.host);
