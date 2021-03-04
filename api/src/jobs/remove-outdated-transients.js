import schedule from 'node-schedule';
import { deleteOlderThan } from '../services/transient.service.js';
import config from '../config.js';
import { subHours } from 'date-fns';

export default schedule.scheduleJob(config.cronSchedule, async () => {
    const result = await deleteOlderThan(
        subHours(new Date(), config.transientLifetime)
    );
    return result;
});
