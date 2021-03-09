const { describe, it } = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const ignore = () => {};

describe('transient model', () => {
  const REQUIRE_PATH = '../../src/models/transient.model.js';

  describe('delete instances older than time', () => {
    describe('lookup resolves', () => {
      describe('destroy resolves', () => {
        it('commits transaction @unit', async () => {
          const commit = sinon.fake();
          class Model {}
          Model.findAll = ignore;
          Model.destroy = ignore;

          const { deleteInstancesOlderThan } = proxyquire(
            REQUIRE_PATH,
            {
              sequelize: { Model, Op: {} },
              './utilities.js': {
                createOrKeepTransaction: ignore,
                commitOrKeepTransaction: commit,
              },
              './model-utils.js': {},
            }
          );

          await deleteInstancesOlderThan();
          assert.ok(commit.called);
        });

        it('returns deleted instances @unit', async () => {
          const expected = {};
          class Model {}
          Model.findAll = () => expected;
          Model.destroy = ignore;

          const { deleteInstancesOlderThan } = proxyquire(
            REQUIRE_PATH,
            {
              sequelize: { Model, Op: {} },
              './utilities.js': {
                createOrKeepTransaction: ignore,
                commitOrKeepTransaction: ignore,
              },
              './model-utils.js': {},
            }
          );

          const result = await deleteInstancesOlderThan();

          assert.strictEqual(result, expected, result);
        });
      });
      describe('destroy rejects', () => {
        it('rolls back transaction @unit', async () => {
          const rollback = sinon.fake();
          class Model {}
          Model.findAll = ignore;
          Model.destroy = sinon.fake.rejects();

          const { deleteInstancesOlderThan } = proxyquire(
            REQUIRE_PATH,
            {
              sequelize: { Model, Op: {} },
              './utilities.js': {
                createOrKeepTransaction: ignore,
                rollbackOrKeepTransaction: rollback,
              },
              './model-utils.js': {},
            }
          );

          try {
            await deleteInstancesOlderThan();
          } catch {} // eslint-disable-line no-empty

          assert.ok(rollback.called);
        });

        it('bubbles error @unit', async () => {
          const error = Error();
          const destroy = sinon.fake.rejects(error);
          class Model {}
          Model.findAll = ignore;
          Model.destroy = destroy;

          const { deleteInstancesOlderThan } = proxyquire(
            REQUIRE_PATH,
            {
              sequelize: { Model, Op: {} },
              './utilities.js': {
                createOrKeepTransaction: ignore,
                rollbackOrKeepTransaction: ignore,
              },
              './model-utils.js': {},
            }
          );

          await assert.isRejected(deleteInstancesOlderThan(), error);
        });
      });
    });

    describe('lookup rejects', () => {
      it('rolls back transaction @unit', async () => {
        const rollback = sinon.fake();
        class Model {}
        Model.findAll = sinon.fake.rejects();

        const { deleteInstancesOlderThan } = proxyquire(
          REQUIRE_PATH,
          {
            sequelize: { Model, Op: {} },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: rollback,
            },
            './model-utils.js': {},
          }
        );

        try {
          await deleteInstancesOlderThan();
        } catch {} // eslint-disable-line no-empty

        assert.ok(rollback.called);
      });

      it('bubbles error @unit', async () => {
        const error = Error();
        const destroy = sinon.fake.rejects(error);
        class Model {}
        Model.findAll = destroy;

        const { deleteInstancesOlderThan } = proxyquire(
          REQUIRE_PATH,
          {
            sequelize: { Model, Op: {} },
            './utilities.js': {
              createOrKeepTransaction: ignore,
              rollbackOrKeepTransaction: ignore,
            },
            './model-utils.js': {},
          }
        );

        await assert.isRejected(deleteInstancesOlderThan(), error);
      });
    });
  });
});
