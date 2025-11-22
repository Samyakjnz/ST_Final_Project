class ArrayUtils {
  static safeSum(arr) {
    if (!Array.isArray(arr)) return 0;
    let sum = 0;
    for (const n of arr) {
      if (typeof n === 'number' && Number.isFinite(n)) sum += n;
    }
    return sum;
  }

  static average(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const sum = this.safeSum(arr);
    return sum / arr.length;
  }

  static unique(arr) {
    if (!Array.isArray(arr)) return [];
    const seen = new Set();
    const out = [];

    for (const v of arr) {
      const key = typeof v === 'object' ? JSON.stringify(v) : v;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(v);
      }
    }
    return out;
  }

  static chunk(arr, size) {
    if (!Array.isArray(arr) || size <= 0) return [];
    const out = [];
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  }
}

module.exports = ArrayUtils;
