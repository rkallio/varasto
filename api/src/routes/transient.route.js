const express = require('express');
const service = require('../services/transient.service.js');
const passport = require('../passport.js');

const router = express.Router();

router.use(passport.authenticate('bearer', { session: false }));

router.get('/', async (request, response) => {
  return response.send(await service.findAll());
});

router.get('/:id', async (request, response) => {
  const id = request.params.id;
  return response.send(await service.findByKey(id));
});

router.post('/', async (request, response) => {
  return response.send(await service.create(request.body));
});

router.patch('/:id', async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  return response.send(await service.updateByKey(id, data));
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  return response.send(await service.deleteByKey(id));
});

module.exports = router;
