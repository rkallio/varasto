import http from 'http';
import express from 'express';
import 'express-async-errors';
import { Server as SocketServer } from 'socket.io';

export const app = express();
export const server = http.createServer(app);
export const io = new SocketServer(server);
