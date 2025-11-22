const { expect } = require('chai');
const StringUtils = require('../src/stringUtils');

describe('StringUtils', () => {

  it('safeTrim', () => {
    expect(StringUtils.safeTrim('  hi  ')).to.equal('hi');
  });

  it('normalizeWhitespace', () => {
    expect(StringUtils.normalizeWhitespace('hi   world')).to.equal('hi world');
  });

  it('toTitleCase', () => {
    expect(StringUtils.toTitleCase('hello world')).to.equal('Hello World');
  });

  it('ensureSuffix', () => {
    expect(StringUtils.ensureSuffix('Hello', '!')).to.equal('Hello!');
  });

  it('maskSensitive', () => {
    expect(StringUtils.maskSensitive('abcdef')).to.equal('ab**ef');
  });

});
