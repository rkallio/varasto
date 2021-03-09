const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const ignore = () => {};

describe('transaction utilities', () => {
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

describe('model utilities', () => {
  const REQUIRE_PATH = '../../src/models/model-utils.js';

  describe('strict find by key', () => {
    describe('query resolves', () => {
      it('commits transaction @unit', async () => {
        const commit = sinon.fake.resolves();
        const model = { findByPk: ignore };

        const { strictFindByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            commitOrKeepTransaction: commit,
          },
        });

        await strictFindByKey(model);
        assert.ok(commit.called);
      });

      it('resolves with value of query @unit', async () => {
        const expected = {};
        const query = sinon.fake.resolves(expected);
        const model = { findByPk: query };

        const { strictFindByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            commitOrKeepTransaction: ignore,
          },
        });

        const result = await strictFindByKey(model);
        assert.strictEqual(result, expected);
      });
    });

    describe('query rejects', () => {
      it('bubbles error @unit', async () => {
        const error = Error();
        const query = sinon.fake.rejects(error);
        const model = { findByPk: query };

        const { strictFindByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: ignore,
          },
        });

        await assert.isRejected(strictFindByKey(model), error);
      });

      it('rolls back transaction @unit', async () => {
        const query = sinon.fake.rejects();
        const rollback = sinon.fake.resolves();
        const model = { findByPk: query };

        const { strictFindByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: rollback,
          },
        });

        try {
          await strictFindByKey(model);
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
          const instance = () => ({ update: ignore });
          const model = { strictFindByKey: instance };

          const { updateByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: commit,
            },
          });

          await updateByKey(model);
          assert.ok(commit.called);
        });

        it('returns the updated item @unit', async () => {
          const expected = {};
          const instance = () => ({ update: () => expected });
          const model = { strictFindByKey: instance };

          const { updateByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: ignore,
            },
          });

          const result = await updateByKey(model);
          assert.strictEqual(result, expected);
        });
      });

      describe('update rejects', () => {
        it('rolls back transaction @unit', async () => {
          const instance = () => ({ update: sinon.fake.rejects() });
          const rollback = sinon.fake();
          const model = { strictFindByKey: instance };

          const { updateByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: rollback,
            },
          });

          try {
            await updateByKey(model);
          } catch {} // eslint-disable-line no-empty

          assert.ok(rollback.called);
        });

        it('bubbles error @unit', async () => {
          const error = Error();
          const instance = () => ({
            update: sinon.fake.rejects(error),
          });
          const model = { strictFindByKey: instance };

          const { updateByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: ignore,
            },
          });

          await assert.isRejected(updateByKey(model), error);
        });
      });
    });

    describe('find rejects', () => {
      it('rolls back transaction @unit', async () => {
        const rollback = sinon.fake();
        const rejects = sinon.fake.rejects();

        const model = { strictFindByKey: rejects };

        const { updateByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: rollback,
          },
        });

        try {
          await updateByKey(model);
        } catch {} // eslint-disable-line no-empty

        assert.ok(rollback.called);
      });

      it('bubbles error @unit', async () => {
        const error = Error();
        const rejects = sinon.fake.rejects(error);
        const model = { strictFindByKey: rejects };

        const { updateByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: ignore,
          },
        });

        await assert.isRejected(updateByKey(model), error);
      });
    });
  });

  describe('delete by key', () => {
    describe('find resolves', () => {
      describe('destroy resolves', () => {
        it('commits transaction @unit', async () => {
          const commit = sinon.fake();
          const instance = () => ({ destroy: ignore });
          const model = { strictFindByKey: instance };

          const { deleteByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: commit,
            },
          });

          await deleteByKey(model);
          assert.ok(commit.called);
        });

        it('returns destroyed item @unit', async () => {
          const expected = {};
          const instance = () => ({ destroy: () => expected });
          const model = { strictFindByKey: instance };

          const { deleteByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              commitOrKeepTransaction: ignore,
            },
          });

          const result = await deleteByKey(model);
          assert.strictEqual(result, expected);
        });
      });

      describe('destroy rejects', () => {
        it('rolls back transaction @unit', async () => {
          const instance = () => ({ destroy: sinon.fake.rejects() });
          const rollback = sinon.fake();
          const model = { strictFindByKey: instance };

          const { deleteByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: rollback,
            },
          });

          try {
            await deleteByKey(model);
          } catch {} // eslint-disable-line no-empty

          assert.ok(rollback.called);
        });

        it('bubbles error @unit', async () => {
          const error = Error();
          const instance = () => ({
            destroy: sinon.fake.rejects(error),
          });
          const model = { strictFindByKey: instance };

          const { deleteByKey } = proxyquire(REQUIRE_PATH, {
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: ignore,
            },
          });

          await assert.isRejected(deleteByKey(model), error);
        });
      });
    });

    describe('find rejects', () => {
      it('rolls back transaction @unit', async () => {
        const rollback = sinon.fake();
        const rejects = sinon.fake.rejects();

        const model = { strictFindByKey: rejects };

        const { deleteByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: rollback,
          },
        });

        try {
          await deleteByKey(model);
        } catch {} // eslint-disable-line no-empty

        assert.ok(rollback.called);
      });

      it('bubbles error @unit', async () => {
        const error = Error();
        const rejects = sinon.fake.rejects(error);
        const model = { strictFindByKey: rejects };

        const { deleteByKey } = proxyquire(REQUIRE_PATH, {
          './utilities.js': {
            createOrKeepTransaction: ignore,
            rollbackOrKeepTransaction: ignore,
          },
        });

        await assert.isRejected(deleteByKey(model), error);
      });
    });
  });
});
