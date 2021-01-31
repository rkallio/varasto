import express from 'express';
const router = express.Router();

import itemRouter from './item.route.js';
import authRouter from './auth.route.js';

router.use('/public/items', itemRouter);
router.use('/public/auth', authRouter);

export default router;
