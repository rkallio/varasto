const { describe, it } = require('mocha');
const chai = require('chai');
const { assert } = chai;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const ignore = () => {};

describe('user model', () => {
  const REQUIRE_PATH = '../../src/models/user.model.js';

  describe('test credentials against database', () => {
    describe('username does not match', () => {
      it('.ok is false @unit', async () => {
        const find = sinon.fake.returns(null);

        class Model {}
        Model.findOne = find;

        const { test } = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          bcrypt: {},
          lodash: { get: ignore },
          './model-utils.js': {},
        });

        const result = await test();

        assert.propertyVal(result, 'ok', false);
      });
    });

    describe('username matches', () => {
      describe('password comparison resolves', () => {
        it('.ok is true @unit', async () => {
          const compare = sinon.fake.resolves(true);
          class Model {}
          Model.findOne = () => ({ password: {} });

          const { test } = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            bcrypt: { compare },
            lodash: { get: ignore },
            './model-utils.js': {},
          });

          const result = await test();
          assert.propertyVal(result, 'ok', true);
        });

        it('.user is matched user @unit', async () => {
          const compare = sinon.fake.resolves(true);
          const expected = { password: {} };
          class Model {}
          Model.findOne = () => expected;

          const { test } = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            bcrypt: { compare },
            lodash: { get: ignore },
            './model-utils.js': {},
          });

          const result = await test();
          assert.propertyVal(result, 'user', expected);
        });
      });

      describe('password comparison rejects', async () => {
        it('.ok is false @unit', async () => {
          const compare = sinon.fake.resolves(false);
          class Model {}
          Model.findOne = () => ({ password: {} });

          const { test } = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            bcrypt: { compare },
            lodash: { get: ignore },
            './model-utils.js': {},
          });

          const result = await test();
          assert.propertyVal(result, 'ok', false);
        });
      });
    });
  });
});
