const { io } = require('./server.js');
const jwt = require('jsonwebtoken');
const { findByKey } = require('./services/user.service.js');
const config = require('./config.js');
const itemService = require('./services/item.service.js');
const transientService = require('./services/transient.service.js');

const itemns = io.of('/items');

itemService.emitter.on('create', (data) => {
  itemns.emit('create', data);
});

itemService.emitter.on('update', (data) => {
  itemns.emit('update', data);
});

itemService.emitter.on('delete', (data) => {
  itemns.emit('delete', data);
});

const transientns = io.of('/transients');

transientService.emitter.on('create', (data) => {
  transientns.emit('create', data);
});

transientService.emitter.on('update', (data) => {
  transientns.emit('update', data);
});

transientService.emitter.on('delete', (data) => {
  transientns.emit('delete', data);
});

transientService.emitter.on('delete-many', (data) => {
  transientns.emit('delete-many', data);
});

const authMiddleware = (socket, next) => {
  const providedAuth = socket.handshake.auth;
  const payload = jwt.verify(providedAuth.token, config.jwtSecret);
  findByKey(payload.id)
    .then(() => next())
    .catch((err) => next(err));
};

itemns.use(authMiddleware);
transientns.use(authMiddleware);

exports.itemns = itemns;
exports.transientns = transientns;
