import express from 'express';

import tryAuthenticate from '../services/auth.service.js';

const router = express.Router();

router.post('/', async (request, response) => {
    const name = request.body.name;
    const password = request.body.password;
    return response.json(await tryAuthenticate(name, password));
});

export default router;
