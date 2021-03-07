const config = require('./config.js');
const express = require('express');
const { app, server } = require('./server.js');

const Sequelize = require('sequelize');
const sequelize = require('./sequelize.init.js');
require('./models/init.model.js');

const dbSync = sequelize.sync();

require('./services/init.service.js');

require('./passport.js');

const routes = require('./routes/init.route.js');

require('./socketns.js');

require('./jobs/remove-outdated-transients.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// sequelize handlers
app.use((error, request, response, _next) => {
  if (error instanceof Sequelize.EmptyResultError) {
    return response.status(404).json({
      error: 'Not Found',
      message: 'Resource not found',
      context: null,
    });
  }

  if (error instanceof Sequelize.ValidationError) {
    const { errors } = error;
    const context = errors.map((item) => {
      return {
        path: item.path,
        type: item.type,
        value: item.value,
      };
    });

    return response.status(400).json({
      error: 'Validation Error',
      message: 'Some fields did not pass validation checks',
      context: context,
    });
  }

  throw error;
});

// any other error
app.use((error, request, response, _next) => {
  return response.status(500).json({
    error: error.name,
    message: null,
    context: null,
  });
});

app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found',
    message: 'Resource not found',
    context: null,
  });
});

dbSync.then(() => {
  server.listen(config.port, config.host);
});
