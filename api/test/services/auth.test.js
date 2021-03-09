const { describe, it } = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const { assert } = chai;
const proxyquire = require('proxyquire').noCallThru();

const ignore = () => {};

describe('auth service', () => {
  const REQUIRE_PATH = '../../src/services/auth.service.js';
  describe('try authenticate', () => {
    describe('test fails', () => {
      it('.ok is false @unit', async () => {
        const test = sinon.fake.resolves({ ok: false });
        const user = { test };

        const { tryAuthenticate } = proxyquire(REQUIRE_PATH, {
          '../sequelize.init.js': { models: { User: user } },
          '../config.js': {},
          jsonwebtoken: {},
        });

        const result = await tryAuthenticate();
        assert.propertyVal(result, 'ok', false);
      });
    });

    describe('test succeeds', () => {
      it('.ok is true @unit', async () => {
        const test = sinon.fake.resolves({ ok: true, user: {} });
        const user = { test };

        const { tryAuthenticate } = proxyquire(REQUIRE_PATH, {
          '../sequelize.init.js': { models: { User: user } },
          '../config.js': {},
          jsonwebtoken: { sign: ignore },
        });

        const result = await tryAuthenticate();
        assert.propertyVal(result, 'ok', true);
      });
      it('.token contains token @unit', async () => {
        const test = sinon.fake.resolves({ ok: true, user: {} });
        const user = { test };
        const expected = 'signed token';
        const sign = sinon.fake.returns(expected);

        const { tryAuthenticate } = proxyquire(REQUIRE_PATH, {
          '../sequelize.init.js': { models: { User: user } },
          '../config.js': {},
          jsonwebtoken: { sign },
        });

        const result = await tryAuthenticate();
        assert.propertyVal(result, 'token', expected);
      });
    });
  });
});
