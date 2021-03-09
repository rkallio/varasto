const schedule = require('node-schedule');
const {
  deleteInstancesOlderThan,
} = require('../services/transient.service.js');
const config = require('../config.js');
const { subHours } = require('date-fns');

module.exports = schedule.scheduleJob(
  config.cronSchedule,
  async () => {
    const result = await deleteInstancesOlderThan(
      subHours(new Date(), config.transientLifetime)
    );
    return result;
  }
);
