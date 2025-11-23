const assert = require('chai').assert;
const s = require('../src/utils/searchUtils');

describe('searchUtils', () => {
  it('binarySearchByKey finds index', () => {
    const arr = [{id:1},{id:2},{id:5}];
    assert.equal(s.binarySearchByKey(arr, 'id', 2), 1);
  });
  it('wildcardMatch works', () => {
    assert.isTrue(s.wildcardMatch('a*cd', 'abzzcd'));
    assert.isTrue(s.wildcardMatch('t?st', 'test'));
  });
  it('fuzzyContains basic', () => {
    assert.isTrue(s.fuzzyContains('abcdef','ace'));
    assert.isFalse(s.fuzzyContains('abc','d'));
  });
});
