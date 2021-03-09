const { describe, it } = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

const ignore = () => {};

describe('item table definition', () => {
  const REQUIRE_PATH = '../../src/models/item.def.js';

  describe('target quantity validation', () => {
    it('throws when measure is % and target quantity not 100 @unit', () => {
      const exports = proxyquire(REQUIRE_PATH, {
        sequelize: { DataTypes: {} },
        '../sequelize.init.js': {},
        './item.model.js': { init: ignore },
      });
      const bound = exports.isTargetQuantity100WhenMeasureIsPercentage.bind(
        { measure: '%', targetQuantity: 0 }
      );
      assert.throws(bound);
    });

    it('does not throw when measure is not % @unit', () => {
      const exports = proxyquire(REQUIRE_PATH, {
        sequelize: { DataTypes: {} },
        '../sequelize.init.js': {},
        './item.model.js': { init: ignore },
      });
      const bound = exports.isTargetQuantity100WhenMeasureIsPercentage.bind(
        { measure: 'pcs', targetQuantity: 0 }
      );
      assert.doesNotThrow(bound);
    });
  });
});
