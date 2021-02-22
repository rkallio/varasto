import { io } from './server.js';
import jwt from 'jsonwebtoken';
import { findByKey } from './services/user.service.js';
import config from './config.js';

export const itemns = io.of('/items');
export const transientns = io.of('/transients');

const authMiddleware = (socket, next) => {
    const providedAuth = socket.handshake.auth;
    const payload = jwt.verify(providedAuth.token, config.jwtSecret);
    findByKey(payload.id)
        .then((user) => next())
        .catch((err) => next(err));
};

itemns.use(authMiddleware);
itemns.use(authMiddleware);
