const { describe, it } = require('mocha');
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

describe('model utilities', () => {
  describe('create or keep', () => {
    it('creates a transaction when not provided one @unit', () => {
      const fake = sinon.fake();
      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': { transaction: fake },
      });

      utils.createOrKeepTransaction(undefined);
      assert.ok(fake.called);
    });

    it('returns created transaction @unit', async () => {
      const trx = {};
      const fake = sinon.fake.resolves(trx);
      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': { transaction: fake },
      });

      const t = await utils.createOrKeepTransaction(undefined);
      assert.strictEqual(t, trx);
    });

    it('does not create a transaction when provided one @unit', () => {
      const fake = sinon.fake();
      const trx = {};
      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': { transaction: fake },
      });

      utils.createOrKeepTransaction(trx);
      assert.ok(fake.notCalled);
    });

    it('returns provided transaction @unit', () => {
      const stub = sinon.stub();
      const obj = {};
      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': { transaction: stub },
      });

      const result = utils.createOrKeepTransaction(obj);
      assert.strictEqual(result, obj);
    });
  });

  describe('commit or keep', () => {
    it('commits when provided and used are different @unit', () => {
      const fake = sinon.fake();
      const provided = {};
      const used = { commit: fake };

      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': {},
      });

      utils.commitOrKeepTransaction({ provided, used });
      assert.ok(fake.calledOnce);
    });

    it('does not commit when provided and used are equal @unit', () => {
      const fake = sinon.fake();
      const provided = { commit: sinon.fake() };
      const used = provided;

      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': {},
      });

      utils.commitOrKeepTransaction({ provided, used });
      assert.ok(fake.notCalled);
    });
  });

  describe('rollback or keep', () => {
    it('rolls back when provided and used are different @unit', () => {
      const provided = {};
      const fake = sinon.fake();
      const used = { rollback: fake };

      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': {},
      });

      utils.rollbackOrKeepTransaction({ provided, used });
      assert.ok(fake.calledOnce);
    });

    it('does not roll back when provided and used are equal @unit', () => {
      const fake = sinon.fake();
      const provided = { rollback: sinon.fake() };
      const used = provided;

      const utils = proxyquire('../../src/models/utilities.js', {
        '../sequelize.init.js': {},
      });

      utils.rollbackOrKeepTransaction({ provided, used });

      assert.ok(fake.notCalled);
    });
  });
});
