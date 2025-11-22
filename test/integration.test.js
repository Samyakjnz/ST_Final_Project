const { expect } = require('chai');
const { calculateAndFormatSummary } = require('../src/index');

describe('Integration', () => {

  it('calculateAndFormatSummary works end-to-end', () => {
    const result = calculateAndFormatSummary([1,2,3], "sample label");

    expect(result.total).to.equal(6);
    expect(result.average).to.equal(2);
    expect(result.doubled).to.deep.equal([2,4,6]);
    expect(result.label).to.equal("Sample Label:");
  });

});
