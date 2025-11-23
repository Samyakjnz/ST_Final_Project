// src/utils/statsUtils.js
function ensureNumericArray(arr) {
  if (!Array.isArray(arr)) throw new Error('expected array');
  return arr.map(x => {
    const n = Number(x);
    if (!Number.isFinite(n)) throw new Error('non-numeric value encountered');
    return n;
  });
}

function mean(arr) {
  const a = ensureNumericArray(arr);
  if (a.length === 0) return NaN;
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i];
  return s / a.length;
}

function median(arr) {
  const a = ensureNumericArray(arr).slice().sort((x,y)=>x-y);
  const n = a.length;
  if (n === 0) return NaN;
  if (n % 2 === 1) return a[(n-1)/2];
  return (a[n/2 - 1] + a[n/2]) / 2;
}

function variance(arr, sample = true) {
  const a = ensureNumericArray(arr);
  const n = a.length;
  if (n === 0) return NaN;
  const mu = mean(a);
  let ss = 0;
  for (let i = 0; i < n; i++) {
    const d = a[i] - mu;
    ss += d * d;
  }
  return sample ? ss / (n - (n>1?1:0)) : ss / n;
}

function stddev(arr, sample = true) {
  const v = variance(arr, sample);
  return Math.sqrt(v);
}

function pearsonCorrelation(xArr, yArr) {
  const x = ensureNumericArray(xArr);
  const y = ensureNumericArray(yArr);
  const n = x.length;
  if (n === 0 || y.length !== n) return NaN;
  const meanX = mean(x), meanY = mean(y);
  let num = 0, sx = 0, sy = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    sx += dx * dx;
    sy += dy * dy;
  }
  const denom = Math.sqrt(sx * sy);
  if (denom === 0) return NaN;
  return num / denom;
}

class RunningStats {
  constructor() { this.n = 0; this.mean = 0; this.M2 = 0; }
  push(x) {
    const value = Number(x);
    if (!Number.isFinite(value)) throw new Error('non-numeric');
    this.n += 1;
    const delta = value - this.mean;
    this.mean += delta / this.n;
    const delta2 = value - this.mean;
    this.M2 += delta * delta2;
  }
  variance(sample = true) { if (this.n < 1) return NaN; return sample ? (this.M2 / (this.n - (this.n>1?1:0))) : (this.M2 / this.n); }
  stddev(sample = true) { return Math.sqrt(this.variance(sample)); }
  count() { return this.n; }
  getMean() { return this.mean; }
}

module.exports = {
  mean,
  median,
  variance,
  stddev,
  pearsonCorrelation,
  RunningStats
};
