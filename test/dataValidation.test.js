const assert = require('chai').assert;
const v = require('../src/utils/dataValidation');

describe('dataValidation', () => {
  it('email validator', () => {
    assert.isTrue(v.isEmail('a@b.co'));
    assert.isFalse(v.isEmail('not-an-email'));
  });
  it('phone validator', () => {
    assert.isTrue(v.isPhone('+1 800 123 4567'));
    assert.isFalse(v.isPhone('abcd'));
  });
  it('safeJsonParse', () => {
    const ok = v.safeJsonParse('{"x":1}');
    assert.isTrue(ok.ok);
    assert.deepEqual(ok.value, { x: 1 });
  });
});
