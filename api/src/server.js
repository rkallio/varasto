const http = require('http');
const express = require('express');
require('express-async-errors');
const { Server } = require('socket.io');

exports.app = express();
exports.server = http.createServer(exports.app);
exports.io = new Server(exports.server);
