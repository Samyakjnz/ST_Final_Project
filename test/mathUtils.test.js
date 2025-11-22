const { expect } = require('chai');
const MathUtils = require('../src/mathUtils');

describe('MathUtils', () => {

  it('clamp works correctly', () => {
    expect(MathUtils.clamp(5, 1, 10)).to.equal(5);
    expect(MathUtils.clamp(-5, 0, 10)).to.equal(0);
    expect(MathUtils.clamp(20, 0, 10)).to.equal(10);
  });

  it('prime checking works', () => {
    expect(MathUtils.isPrime(2)).to.equal(true);
    expect(MathUtils.isPrime(11)).to.equal(true);
    expect(MathUtils.isPrime(12)).to.equal(false);
  });

  it('factorial works', () => {
    expect(MathUtils.factorial(5)).to.equal(120);
    expect(MathUtils.factorial(0)).to.equal(1);
  });

  it('gcd works', () => {
    expect(MathUtils.gcd(12, 18)).to.equal(6);
  });

  it('lcm works', () => {
    expect(MathUtils.lcm(4, 6)).to.equal(12);
  });

});
