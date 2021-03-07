const { io } = require('./server.js');
const jwt = require('jsonwebtoken');
const { findByKey } = require('./services/user.service.js');
const config = require('./config.js');

exports.itemns = io.of('/items');
exports.transientns = io.of('/transients');

const authMiddleware = (socket, next) => {
    const providedAuth = socket.handshake.auth;
    const payload = jwt.verify(providedAuth.token, config.jwtSecret);
    findByKey(payload.id)
        .then((user) => next())
        .catch((err) => next(err));
};

exports.itemns.use(authMiddleware);
exports.itemns.use(authMiddleware);
