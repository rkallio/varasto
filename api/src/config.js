import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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
    .help().argv;

export default argv;
