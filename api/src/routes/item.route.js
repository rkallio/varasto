import express from 'express';

import * as itemService from '../services/item.service.js';

const router = express.Router();

router.get('/', async (request, response) => {
    return response.send(await itemService.findAll());
})

export default router;
