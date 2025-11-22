const { expect } = require('chai');
const ArrayUtils = require('../src/arrayUtils');

describe('ArrayUtils', () => {

  it('safeSum works', () => {
    expect(ArrayUtils.safeSum([1,2,3])).to.equal(6);
  });

  it('average works', () => {
    expect(ArrayUtils.average([2, 4])).to.equal(3);
  });

  it('unique works', () => {
    expect(ArrayUtils.unique([1,1,2])).to.deep.equal([1,2]);
  });

  it('chunk works', () => {
    expect(ArrayUtils.chunk([1,2,3,4], 2)).to.deep.equal([[1,2],[3,4]]);
  });

});
