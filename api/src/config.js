import { format } from 'util';

const rules = {
    INVENTORY_SERVER_PORT: {
        coercer: Number,
    },
    INVENTORY_SERVER_HOST: {
        coercer: String,
    },
    INVENTORY_DB_DIALECT: {
        coercer: String,
    },
    INVENTORY_DB_STORAGE: {
        coercer: String,
    }
};

const env = process.env;

const mismatch = Object.keys(rules)
      .map(ruleName => {
          if(Object.keys(env).some(keyName => keyName === ruleName)) {
              return [true, ruleName];
          } else {
              return [false, ruleName];
          }
      })
      .filter(([exist, _]) => !exist)
      .map(([_, name]) => name);

if(mismatch.length > 0) {
    throw Error(format('Missing properties: %s', mismatch));
};

export default Object.entries(rules)
    .map(([key, props]) => {
        const o = Object.entries(env)
              .find(([k, _]) => key === k);
        return [props.rename ? props.rename : key,
                props.coercer ? props.coercer(o[1]) : o[1]];
    })
    .reduce((prev, [key, value]) => {
        prev[key] = value;
        return prev;
    }, {});
