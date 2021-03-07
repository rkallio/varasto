const schedule = require('node-schedule');
const {
    deleteOlderThan,
} = require('../services/transient.service.js');
const config = require('../config.js');
const { subHours } = require('date-fns');

module.exports = schedule.scheduleJob(
    config.cronSchedule,
    async () => {
        const result = await deleteOlderThan(
            subHours(new Date(), config.transientLifetime)
        );
        return result;
    }
);
