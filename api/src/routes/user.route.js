import express from 'express';

import * as userService from '../services/user.service.js';

const router = express.Router();

router.get('/', async (request, response) => {
    return response.send(await userService.findAll());
});

router.get('/:id', async (request, response) => {
    const id = request.params.id;
    return response.send(await userService.findByKey(id));
});

router.post('/', async (request, response) => {
    return response.send(await userService.create(request.body));
});

router.patch('/:id', async (request, response) => {
    const id = request.params.id;
    const data = request.body;
    return response.send(await userService.updateByKey(id, data));
});

router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    return response.send(await userService.deleteByKey(id));
});

export default router;
