const express = require('express');

const { tryAuthenticate } = require('../services/auth.service.js');

const router = express.Router();

router.post('/', async (request, response) => {
  const name = request.body.name;
  const password = request.body.password;
  const result = await tryAuthenticate(name, password);
  if (result.ok) {
    return response.json(result.token);
  } else {
    return response.status(400).send({
      error: 'Identification error',
      message: 'Supplied username or password incorrect',
      context: { name, password },
    });
  }
});

module.exports = router;
