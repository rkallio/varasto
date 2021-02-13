import { io } from './server.js';
import jwt from 'jsonwebtoken';
import { findByKey } from './services/user.service.js';
import config from './config.js';

export const itemns = io.of('/items');

itemns.use((socket, next) => {
    const auth = socket.handshake.auth;
    const payload = jwt.verify(auth.token, config.jwtSecret);
    findByKey(payload.id)
        .then(user => next())
        .catch(err => next(err));
});
