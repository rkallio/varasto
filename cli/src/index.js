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

const referenceSchema = {
    name: {
        description: 'name',
        type: 'string',
    },
    location: {
        description: 'location',
        type: 'string',
    },
    quantity: {
        description: 'quantity',
        type: 'number',
    }
}

async function create() {
    const schema = JSON.parse(JSON.stringify(referenceSchema));
    schema.properties.name.required = true;
    schema.properties.location.required = true;
    schema.properties.quantity.required = true;

    const input = await prompt.get(schema);
    const request = axios.post(format('%s/items', api), input);
    const response = await request;
    const data = response.data;
    console.log(makeTable(data));
}

async function update(id) {
    const contextRequest = axios.get(
        format('%s/items/%s', api, id));
    const ContextResponse = await request;
    const defaults = contextResponse.data;

    const schema = JSON.parse(JSON.stringify(referenceSchema));
    schema.properties.name.default = defaults.name;
    schema.properties.location.default = defaults.location;
    schema.properties.quantity.default = defaults.quantity;

    const input = await prompt.get(schema);

    const request = axios.patch(
        format('%s/items/%s', api, id), input);
    const response = await request;
    const data = response.data;

    console.log(makeTable(data));
}

}

const argv = yargs(hideBin(process.argv))
      .command('list', 'list items in inventory', list)
      .command({
          command: 'get <id>',
          desc: 'get an item from the inventory',
          handler: argv => get(argv.id)
      })
      .command('add', 'add a new item to inventory', create)
      .command({
          command: 'update <id>',
          desc: 'update an existing item',
          handler: argv => update(argv.id)
      })
      .help()
      .argv
