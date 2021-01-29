import express from 'express';

import * as itemService from '../services/item.service.js';

const router = express.Router();

router.get('/', async (request, response) => {
    return response.send(await itemService.findAll());
});

router.get('/:id', async (request, response) => {
    const id = request.params.id;
    return response.send(await itemService.findByKey(id));
});

router.post('/', async (request, response) => {
    return response.send(await itemService.create(request.body));
})

export default router;
