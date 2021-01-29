import yargs from 'yargs';
import axios from 'axios';
import { format } from 'util';
import { hideBin } from 'yargs/helpers';
import { table  } from 'table';
import prompt from 'prompt';
import { formatDistanceToNow, parseISO } from 'date-fns';

const api = 'http://localhost:8000';

function makeTable(itemData) {
    if(!Array.isArray(itemData)) {
        itemData = [itemData];
    }

    if(itemData.length === 0) {
        return undefined;
    }

    const header = Object.keys(itemData[0])

    const values = itemData
          .map(cell => {
              const copy = { ...cell };
              if(copy.createdAt) {
                  copy.createdAt = formatDistanceToNow(
                      parseISO(copy.createdAt), {
                          includeSeconds: true,
                          addSuffix: true
                      });
              }
              if(copy.updatedAt) {
                  copy.updatedAt = formatDistanceToNow(
                      parseISO(copy.updatedAt), {
                          includeSeonds: true,
                          addSuffix: true
                      })
              }
              return copy;
          })
          .map(Object.values);

    return table([header, ...values]);
}

async function list() {
    const request = axios.get(format('%s/items', api));
    let response = await request;
    const data = response.data;
    console.log(makeTable(data));
}

async function get(id) {
    const request  = axios.get(format('%s/items/%s', api));
    let response = await request;
    const data = response.data;
    console.log(makeTable(data));
}

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
      .command({
          command: 'get <id>',
          desc: 'get an item from the inventory',
          handler: argv => get(argv.id)
      })
      .command('add', 'add a new item to inventory', create)
      .help()
      .argv
