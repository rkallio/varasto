import yargs from 'yargs';
import axios from 'axios';
import { format } from 'util';
import { hideBin } from 'yargs/helpers';
import { table  } from 'table';
import prompt from 'prompt';
import { formatDistanceToNow, parseISO } from 'date-fns';

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

function reportError(err) {
    if(err.response.data) {
        const errdata = err.response.data;
        console.error(format('%s: %s', errdata.error, errdata.message));
        if(errdata.context) {
            console.error(JSON.stringify(errdata.context, null, 4));
        }
    } else {
        throw err;
    }
}

async function list(argv) {
    const request = axios.get(format('%s/items', argv.host));
    let response
    try {
        response = await request;
    } catch(error) {
        reportError(error);
        return;
    }
    const data = response.data;
    console.log(makeTable(data));
}

async function get(argv) {
    const request  = axios.get(format('%s/items/%s', argv.host, argv.id));
    let response;
    try {
        response = await request;
    } catch(err) {
        reportError(err);
        return;
    }
    const data = response.data;
    console.log(makeTable(data));
}

const referenceSchema = {
    properties: {
        name: {
            description: 'name',
            type: 'string',
        },
        location: {
            description: 'location',
            type: 'string',
        },
        currentQuantity: {
            description: 'Current Quantity',
            type: 'number',
        },
        targetQuantity: {
            description: 'Target Quantity',
            type: 'number',
        }
    }
}

async function create(argv) {
    const schema = JSON.parse(JSON.stringify(referenceSchema));
    schema.properties.name.required = true;
    schema.properties.location.required = true;
    schema.properties.currentQuantity.required = true;
    schema.properties.targetQuantity.required = true;

    const input = await prompt.get(schema);

    const request = axios.post(format('%s/items', argv.host, input));
    let response;
    try {
        response = await request;
    } catch(err) {
        reportError(err);
        return;
    }
    const data = response.data;
    console.log(makeTable(data));
}

async function update(argv) {
    const contextRequest = axios.get(
        format('%s/items/%s', argv.host, argv.id));
    const contextResponse = await contextRequest;
    const defaults = contextResponse.data;

    const schema = JSON.parse(JSON.stringify(referenceSchema));
    schema.properties.name.default = defaults.name;
    schema.properties.location.default = defaults.location;
    schema.properties.currentQuantity.default = defaults.currentQuantity;
    schema.properties.targetQuantity.default = defaults.targetQuantity;

    const input = await prompt.get(schema);

    const request = axios.patch(
        format('%s/items/%s', argv.host, argv.id), input);
    const response = await request;
    const data = response.data;

    console.log(makeTable(data));
}

async function remove(argv) {
    const request = axios.delete(
        format('%s/items/%s', argv.host, argv.id));
    const response = await request;
    const data = response.data;
    console.log(makeTable(data));
}

const argv = yargs(hideBin(process.argv))
      .env('INVENTORY_CLI_')
      .option('host', {
          demandOption: true,
          describe: 'hostname of the target service',
          type: 'string'
      })
      .command({
          command: 'list',
          desc: 'list items in inventory',
          handler: list
      })
      .command({
          command: 'get <id>',
          desc: 'get an item from inventory',
          handler: get
      })
      .command({
          command: ['add', 'create'],
          desc: 'add a new item to inventory',
          handler: create
      })
      .command({
          command: 'update <id>',
          desc: 'update an existing item',
          handler: update
      })
      .command({
          command: 'remove <id>',
          desc: 'remove an item',
          handler: remove
      })
      .help()
      .argv
