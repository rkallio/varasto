const express = require('express');
const router = express.Router();

const itemRouter = require('./item.route.js');
const transientRouter = require('./transient.route.js');
const authRouter = require('./auth.route.js');
const userRouter = require('./user.route.js');

router.use('/public/items', itemRouter);
router.use('/public/transients', transientRouter);
router.use('/public/auth', authRouter);
router.use('/private/users', userRouter);

module.exports = router;
