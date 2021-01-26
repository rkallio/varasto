import yargs from 'yargs';
import axios from 'axios';
import { format } from 'util';
import { hideBin } from 'yargs/helpers';
import { table  } from 'table';
import prompt from 'prompt';

const api = 'http://localhost:8000';

async function list() {
    const request = axios.get(format('%s/items', api));
    try {
        const data = (await request).data;
        const header = Object.keys(data[0]);
        const values = data.map(Object.values);
        const tableData = [
            header,
            ...values
        ];
        console.log(table(tableData));
    } catch(error) {
        console.error(
            format('%s: %s', error.name, error.message));
    }
}

async function create() {
    prompt.message = 'item';
    const schema = {
        properties: {
            name: {
                description: 'name',
                type: 'string',
                required: true
            },
            location: {
                description: 'location',
                type: 'string',
                required: true
            },
            quantity: {
                description: 'quantity',
                type: 'number',
                required: true
            }
        }
    };

    const input = await prompt.get(schema);
    const request = axios.post(format('%s/items', api), input);
    const response = await request;
    const data = response.data;
    console.log(Object.keys(data));
    console.log(table([
        Object.keys(data),
        Object.values(data)]));
}

const argv = yargs(hideBin(process.argv))
      .command('list', 'list items in inventory', list)
      .command('add', 'add a new item to inventory', create)
      .help()
      .argv
