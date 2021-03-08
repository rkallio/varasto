const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

describe('item model', () => {
  describe('strict find by key', () => {
    it('when query resolves, commits transaction @unit', async () => {
      const query = sinon.fake.resolves();
      const commit = sinon.fake.resolves();

      function Model() {}
      Model.init = () => {};
      Model.findByPk = query;

      const Item = proxyquire('../../src/models/item.model.js', {
        sequelize: { Model, DataTypes: {} },
        '../sequelize.init.js': {},
        lodash: { get: () => {} },
        './utilities.js': {
          createOrKeepTransaction: () => {},
          commitOrKeepTransaction: commit,
        },
      });
      await Item.strictFindByKey();
      assert.ok(commit.calledOnce);
    });

    it('when query rejects, bubbles the error @unit', async () => {
      const error = Error();
      const query = sinon.fake.rejects(error);

      function Model() {}
      Model.findByPk = query;
      Model.init = () => {};

      const Item = proxyquire('../../src/models/item.model.js', {
        sequelize: { Model, DataTypes: {} },
        '../sequelize.init.js': {},
        lodash: { get: () => {} },
        './utilities.js': {
          createOrKeepTransaction: () => {},
          rollbackOrKeepTransaction: () => {},
        },
      });

      await assert.isRejected(Item.strictFindByKey(), error);
    });

    it('when query rejects, rolls back the transaction @unit', async () => {
      const query = sinon.fake.rejects();
      const rollback = sinon.fake.resolves();
      function Model() {}
      Model.findByPk = query;
      Model.init = () => {};

      const Item = proxyquire('../../src/models/item.model.js', {
        sequelize: { Model, DataTypes: {} },
        '../sequelize.init.js': {},
        lodash: { get: () => {} },
        './utilities.js': {
          createOrKeepTransaction: () => {},
          rollbackOrKeepTransaction: rollback,
        },
      });

      try {
        await Item.strictFindByKey();
      } catch {} // eslint-disable-line no-empty
      assert.ok(rollback.calledOnce);
    });
  });
});
