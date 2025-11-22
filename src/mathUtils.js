class MathUtils {
  static clamp(value, min, max) {
    if (min > max) {
      const t = min;
      min = max;
      max = t;
    }

    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  static isPrime(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) return false;
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  static factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) return null;
    if (n < 0) return null;
    if (n === 0 || n === 1) return 1;

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
      if (!Number.isFinite(result)) return null;
    }
    return result;
  }

  static gcd(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return null;

    a = Math.abs(a);
    b = Math.abs(b);

    if (a === 0 && b === 0) return null;
    if (a === 0) return b;
    if (b === 0) return a;

    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  static lcm(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return null;

    a = Math.abs(a);
    b = Math.abs(b);

    if (a === 0 || b === 0) return 0;

    const g = this.gcd(a, b);
    if (!g) return null;

    const result = (a / g) * b;
    return Number.isFinite(result) ? result : null;
  }
}

module.exports = MathUtils;
