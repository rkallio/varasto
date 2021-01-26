import express from 'express';
const router = express.Router();

import itemRouter from './item.route.js';

router.use('/items', itemRouter);

export default router;
