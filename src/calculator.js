/**
 * Calculator class with rich control flow.
 */

class Calculator {
  
  add(a, b) {
    if (a === null || b === null) return null;
    if (typeof a !== 'number' || typeof b !== 'number') return null;
    return a + b;
  }

  subtract(a, b) {
    if (a === null || b === null) return null;
    if (typeof a !== 'number' || typeof b !== 'number') return null;
    return a - b;
  }

  multiply(a, b) {
    if (a === null || b === null) return null;
    if (typeof a !== 'number' || typeof b !== 'number') return null;
    return a * b;
  }

  divide(a, b) {
    if (a === null || b === null) return null;
    if (typeof a !== 'number' || typeof b !== 'number') return null;
    if (b === 0) return null;
    return a / b;
  }
}

module.exports = Calculator;
