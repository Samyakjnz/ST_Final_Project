const assert = require('chai').assert;
const s = require('../src/utils/statsUtils');

describe('statsUtils', () => {
  it('mean & median', () => {
    assert.equal(s.mean([1,2,3]), 2);
    assert.equal(s.median([5,1,3]), 3);
  });
  it('pearson correlation', () => {
    const x = [1,2,3,4], y = [2,4,6,8];
    assert.approximately(s.pearsonCorrelation(x,y), 1, 1e-10);
  });
  it('running stats', () => {
    const r = new s.RunningStats();
    r.push(1); r.push(2); r.push(3);
    assert.equal(r.count(), 3);
    assert.approximately(r.getMean(), 2, 1e-10);
  });
});
