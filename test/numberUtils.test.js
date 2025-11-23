const assert = require('chai').assert;
const num = require('../src/utils/numberUtils');

describe('numberUtils', () => {

  it('clamp works', () => {
    assert.equal(num.clamp(5, 0, 10), 5);
    assert.equal(num.clamp(-5, 0, 10), 0);
    assert.equal(num.clamp(50, 0, 10), 10);
  });

  it('rounding functions', () => {
    assert.equal(num.roundTo(1.2345, 2), 1.23);
    assert.equal(num.floorTo(1.999, 0), 1);
    assert.equal(num.ceilTo(1.001, 0), 2);
  });

  it('safe parsing', () => {
    assert.equal(num.safeParseFloat("12.5"), 12.5);
    assert.isNaN(num.safeParseFloat("abc"));
    assert.equal(num.safeParseInt("42"), 42);
  });

  it('conversions deg/rad', () => {
    assert.approximately(num.degToRad(180), Math.PI, 1e-10);
    assert.approximately(num.radToDeg(Math.PI), 180, 1e-10);
  });

  it('randomInt range (deterministic check)', () => {
    const v = num.randomInt(1, 3);
    assert.isTrue([1,2,3].includes(v));
  });

  it('simpleHash deterministic', () => {
    assert.equal(num.simpleHash(123), num.simpleHash(123));
  });

  it('approxEqual works', () => {
    assert.isTrue(num.approxEqual(1.0000001, 1.0000002, 1e-6));
    assert.isFalse(num.approxEqual(1, 2));
  });

  it('normalize and lerp', () => {
    assert.equal(num.normalize(5, 0, 10), 0.5);
    assert.equal(num.lerp(0, 10, 0.3), 3);
  });

  it('range generates arithmetic sequence', () => {
    assert.deepEqual(num.range(1, 5, 2), [1,3,5]);
    assert.deepEqual(num.range(5, 1, -2), [5,3,1]);
  });

  it('movingAverage basic', () => {
    assert.deepEqual(
      num.movingAverage([1,2,3,4], 2).map(v => Number(v.toFixed(2))),
      [1.00, 1.50, 2.50, 3.50]
    );
  });

  it('quantize works', () => {
    assert.equal(num.quantize(7.3, 1), 7);
    assert.equal(num.quantize(7.6, 1), 8);
  });

  it('wrap cyclic behavior', () => {
    assert.equal(num.wrap(370, 0, 360), 10);
    assert.equal(num.wrap(-10, 0, 360), 350);
  });
});
