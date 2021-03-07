const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .env('INVENTORY_SERVER_')
  .option('port', {
    demandOption: true,
    describe: 'port the server binds itself to',
    type: 'number',
  })
  .option('host', {
    demandOption: true,
    describe: 'host the server binds itself to',
    type: 'string',
  })
  .option('db-dialect', {
    demandOption: true,
    describe: 'dialect used by database adapter',
    type: 'string',
  })
  .option('db-storage', {
    demandOption: true,
    describe: 'database storage location',
    type: 'string',
  })
  .option('db-logging', {
    demandOption: true,
    describe: 'use database logging',
    type: 'boolean',
    coerce: (v) => (v ? console.log : false),
  })
  .option('salt-rounds', {
    demandOption: true,
    describe: 'rounds of salt for password generation',
    type: 'number',
  })
  .option('jwt-secret', {
    demandOption: true,
    describe: 'secret used to sign json web tokens',
    type: 'string',
  })
  .option('cron-schedule', {
    demandOption: true,
    describe: 'cron schedule for running jobs',
    type: 'string',
  })
  .option('transient-lifetime', {
    demandOption: true,
    describe: 'Minimum lifetime of unmodified transient items',
    type: 'number',
  })
  .help().argv;

module.exports = argv;
