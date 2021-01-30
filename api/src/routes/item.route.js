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
});

router.patch('/:id', async (request, response) => {
    const id = request.params.id;
    const data = request.body;
    return response.send(await itemService.updateByKey(id, data));
});

router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    return response.send(await itemService.deleteByKey(id));
});

export default router;
