const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const REQUIRE_PATH = '../../src/models/item.model.js';
const ignore = () => {};

describe('item model', () => {
  describe('strict find by key', () => {
    describe('query resolves', () => {
      it('commits transaction @unit', async () => {
        const query = ignore;
        const commit = sinon.fake.resolves();

        function Model() {}
        Model.init = ignore;
        Model.findByPk = query;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
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
        Model.init = ignore;
        Model.findByPk = query;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
            commitOrKeepTransaction: ignore,
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
        Model.init = ignore;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: ignore,
          },
        });

        await assert.isRejected(Item.strictFindByKey(), error);
      });

      it('rolls back transaction @unit', async () => {
        const query = sinon.fake.rejects();
        const rollback = sinon.fake.resolves();
        function Model() {}
        Model.findByPk = query;
        Model.init = ignore;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
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
          const update = () => ({ update: ignore });
          function Model() {}
          Model.init = ignore;

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
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
          Model.init = ignore;

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: ignore,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(update);
          const result = await Item.updateByKey();
          assert.strictEqual(result, expected);
        });
      });

      describe('update rejects', () => {
        it('rolls back transaction @unit', async () => {
          const update = () => ({ update: sinon.fake.rejects() });
          const rollback = sinon.fake();
          function Model() {}
          Model.init = ignore;

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: rollback,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(update);

          try {
            await Item.updateByKey();
          } catch {} // eslint-disable-line no-empty

          assert.ok(rollback.called);
        });

        it('bubbles error @unit', async () => {
          const error = Error();
          const update = () => ({
            update: sinon.fake.rejects(error),
          });
          function Model() {}
          Model.init = ignore;
          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: ignore,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(update);

          await assert.isRejected(Item.updateByKey(), error);
        });
      });
    });

    describe('find rejects', () => {
      it('rolls back transaction @unit', async () => {
        const rollback = sinon.fake();
        const rejects = sinon.fake.rejects();

        function Model() {}
        Model.init = ignore;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: rollback,
          },
        });

        sinon.stub(Item, 'strictFindByKey').callsFake(rejects);

        try {
          await Item.updateByKey();
        } catch {} // eslint-disable-line no-empty

        assert.ok(rollback.called);
      });
      it('bubbles error @unit', async () => {
        const error = Error();
        const rejects = sinon.fake.rejects(error);
        function Model() {}
        Model.init = ignore;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: ignore,
          },
        });

        sinon.stub(Item, 'strictFindByKey').callsFake(rejects);

        await assert.isRejected(Item.updateByKey(), error);
      });
    });
  });

  describe('delete by key', () => {
    describe('find resolves', () => {
      describe('destroy resolves', () => {
        it('commits transaction @unit', async () => {
          const commit = sinon.fake();
          const destroy = () => ({ destroy: ignore });
          function Model() {}
          Model.init = ignore;

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: commit,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(destroy);

          await Item.deleteByKey();
          assert.ok(commit.called);
        });
        it('returns destroyed item @unit', async () => {
          const expected = {};
          const destroy = () => ({ destroy: () => expected });
          function Model() {}
          Model.init = ignore;

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: ignore,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(destroy);
          const result = await Item.deleteByKey();
          assert.strictEqual(result, expected);
        });
      });

      describe('destroy rejects', () => {
        it('rolls back transaction @unit', async () => {
          const destroy = () => ({ destroy: sinon.fake.rejects() });
          const rollback = sinon.fake();
          function Model() {}
          Model.init = ignore;

          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: rollback,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(destroy);

          try {
            await Item.deleteByKey();
          } catch {} // eslint-disable-line no-empty

          assert.ok(rollback.called);
        });
        it('bubbles error @unit', async () => {
          const error = Error();
          const destroy = () => ({
            destroy: sinon.fake.rejects(error),
          });
          function Model() {}
          Model.init = ignore;
          const Item = proxyquire(REQUIRE_PATH, {
            sequelize: { Model },
            lodash: { get: ignore },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: ignore,
            },
          });

          sinon.stub(Item, 'strictFindByKey').callsFake(destroy);

          await assert.isRejected(Item.deleteByKey(), error);
        });
      });
    });

    describe('find rejects', () => {
      it('rolls back transaction @unit', async () => {
        const rollback = sinon.fake();
        const rejects = sinon.fake.rejects();

        function Model() {}
        Model.init = ignore;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: rollback,
          },
        });

        sinon.stub(Item, 'strictFindByKey').callsFake(rejects);

        try {
          await Item.deleteByKey();
        } catch {} // eslint-disable-line no-empty

        assert.ok(rollback.called);
      });
      it('bubbles error @unit', async () => {
        const error = Error();
        const rejects = sinon.fake.rejects(error);
        function Model() {}
        Model.init = ignore;

        const Item = proxyquire(REQUIRE_PATH, {
          sequelize: { Model },
          lodash: { get: ignore },
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: ignore,
          },
        });

        sinon.stub(Item, 'strictFindByKey').callsFake(rejects);

        await assert.isRejected(Item.deleteByKey(), error);
      });
    });
  });
});
