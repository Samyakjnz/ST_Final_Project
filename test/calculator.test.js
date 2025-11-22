const { expect } = require('chai');
const Calculator = require('../src/calculator');

describe('Calculator', () => {
  const calc = new Calculator();

  it('should add correctly', () => {
    expect(calc.add(1, 2)).to.equal(3);
  });

  it('should subtract correctly', () => {
    expect(calc.subtract(5, 3)).to.equal(2);
  });

  it('should multiply correctly', () => {
    expect(calc.multiply(4, 3)).to.equal(12);
  });

  it('should divide correctly', () => {
    expect(calc.divide(12, 3)).to.equal(4);
  });

  it('should return null on division by zero', () => {
    expect(calc.divide(10, 0)).to.equal(null);
  });
});
