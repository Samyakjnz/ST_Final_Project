const assert = require('chai').assert;
const du = require('../src/utils/dateUtils');

describe('dateUtils', () => {
  it('parses ISO and formats', () => {
    const d = du.parseDate('2025-11-23');
    assert.isNotNull(d);
    assert.equal(du.formatDate(d), '2025-11-23');
  });
  it('diffInDays simple', () => {
    assert.equal(du.diffInDays('2025-11-23','2025-11-22'), 1);
  });
  it('add months handles end of month', () => {
    const d = du.parseDate('2025-01-31');
    const d2 = du.add(d, { months: 1 });
    assert.equal(du.formatDate(d2), '2025-02-28');
  });
});
