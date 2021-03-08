const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const REQUIRE_PATH = '../../src/models/item.model.js';

describe('item model', () => {
  describe('strict find by key', () => {
    describe('query resolves', () => {
      it('commits transaction @unit', async () => {
        const query = () => {};
        const commit = sinon.fake.resolves();

        function Model() {}
        Model.init = () => {};
        Model.findByPk = query;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model, DataTypes: {} },
          '../sequelize.init.js': {},
          lodash: { get: () => {} },
          './utilities.js': {
            createOrKeepTransaction: () => {},
            commitOrKeepTransaction: commit,
          },
        });
        await Item.strictFindByKey();
        assert.ok(commit.called);
      });

      it('resolves with value of query @unit', async () => {
        const expected = {};
        const query = sinon.fake.resolves(expected);

        function Model() {}
        Model.init = () => {};
        Model.findByPk = query;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model, DataTypes: {} },
          '../sequelize.init.js': {},
          lodash: { get: () => {} },
          './utilities.js': {
            createOrKeepTransaction: () => {},
            commitOrKeepTransaction: () => {},
          },
        });
        const result = await Item.strictFindByKey();
        assert.strictEqual(result, expected);
      });
    });

    describe('query rejects', () => {
      it('bubbles error @unit', async () => {
        const error = Error();
        const query = sinon.fake.rejects(error);

        function Model() {}
        Model.findByPk = query;
        Model.init = () => {};

        const Item = proxyquire(REQUIRE_PATH, {
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

      it('rolls back transaction @unit', async () => {
        const query = sinon.fake.rejects();
        const rollback = sinon.fake.resolves();
        function Model() {}
        Model.findByPk = query;
        Model.init = () => {};

        const Item = proxyquire(REQUIRE_PATH, {
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
        assert.ok(rollback.called);
      });
    });
  });

  describe('update by key', () => {
    describe('find resolves', () => {
      describe('update resolves', () => {
        it('commits transaction @unit', async () => {
          const commit = sinon.fake();
          const update = () => ({ update: () => {} });
          function Model() {}
          Model.init = () => {};

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model, DataTypes: {} },
            '../sequelize.init.js': {},
            lodash: { get: () => {} },
            './utilities.js': {
              createOrKeepTransaction: () => {},
              commitOrKeepTransaction: commit,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(update);

          await Item.updateByKey();
          assert.ok(commit.called);
        });

        it('returns the updated item @unit', async () => {
          const expected = {};
          const update = () => ({ update: () => expected });
          function Model() {}
          Model.init = () => {};

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model, DataTypes: {} },
            '../sequelize.init.js': {},
            lodash: { get: () => {} },
            './utilities.js': {
              createOrKeepTransaction: () => {},
              commitOrKeepTransaction: () => {},
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(update);
          const result = await Item.updateByKey();
          assert.strictEqual(result, expected);
        });
      });

      describe('update rejects', () => {
        it('rolls back transaction @unit');
        it('bubbles error @unit');
      });
    });
    describe('find rejects', () => {
      it('rolls back transaction @unit');
      it('bubbles error @unit');
    });
  });

  describe('delete by key', () => {
    describe('find resolves', () => {
      describe('destroy resolves', () => {
        it('commits transaction @unit');
        it('returns destroyed item @unit');
      });

      describe('destroy rejects', () => {
        it('rolls back transaction @unit');
        it('bubbles error @unit');
      });
    });

    describe('find rejects', () => {
      it('rolls back transaction @unit');
      it('bubbles error @unit');
    });
  });
});
