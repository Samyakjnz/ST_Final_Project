// src/utils/numberUtils.js
// General numeric utilities: rounding, clamping, conversions, randomness, hashing, stats, sequences.

function clamp(num, min, max) {
  const n = Number(num);
  if (!Number.isFinite(n)) return NaN;
  return Math.min(Math.max(n, min), max);
}

function roundTo(num, decimals = 0) {
  const n = Number(num);
  if (!Number.isFinite(n)) return NaN;
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

function floorTo(num, decimals = 0) {
  const n = Number(num);
  if (!Number.isFinite(n)) return NaN;
  const factor = Math.pow(10, decimals);
  return Math.floor(n * factor) / factor;
}

function ceilTo(num, decimals = 0) {
  const n = Number(num);
  if (!Number.isFinite(n)) return NaN;
  const factor = Math.pow(10, decimals);
  return Math.ceil(n * factor) / factor;
}

// convert string "123.45" -> 123.45, or return defaultValue
function safeParseFloat(s, defaultValue = NaN) {
  if (typeof s === 'number') return s;
  if (typeof s !== 'string') return defaultValue;
  const n = parseFloat(s.trim());
  return Number.isFinite(n) ? n : defaultValue;
}

// convert to integer safely
function safeParseInt(s, defaultValue = NaN) {
  if (typeof s === 'number') return Math.trunc(s);
  if (typeof s !== 'string') return defaultValue;
  const n = parseInt(s.trim(), 10);
  return Number.isFinite(n) ? n : defaultValue;
}

// convert degrees to radians
function degToRad(deg) {
  const n = Number(deg);
  return Number.isFinite(n) ? (n * Math.PI) / 180 : NaN;
}

// convert radians to degrees
function radToDeg(rad) {
  const n = Number(rad);
  return Number.isFinite(n) ? (n * 180) / Math.PI : NaN;
}

// get random float in range
function randomFloat(min = 0, max = 1) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return NaN;
  return Math.random() * (max - min) + min;
}

// get random integer inclusive
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return NaN;
  if (max < min) return NaN;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// simple hash of a number (deterministic), good for mutation
function simpleHash(num) {
  const n = Number(num);
  if (!Number.isFinite(n)) return 0;
  let x = Math.floor(n * 2654435761) >>> 0;
  x = (x ^ (x >>> 16)) >>> 0;
  x = (x * 2246822507) >>> 0;
  return x >>> 0;
}

// check if number is approx equal within epsilon
function approxEqual(a, b, eps = 1e-9) {
  const x = Number(a), y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  return Math.abs(x - y) <= eps;
}

// normalize number to range [0,1]
function normalize(num, min, max) {
  const n = Number(num);
  if (!Number.isFinite(n) || !Number.isFinite(min) || !Number.isFinite(max)) return NaN;
  if (max === min) return NaN;
  return (n - min) / (max - min);
}

// linear interpolate between a and b with t in [0,1]
function lerp(a, b, t) {
  a = Number(a); b = Number(b); t = Number(t);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(t)) return NaN;
  return a + (b - a) * t;
}

// generate arithmetic sequence
function range(start, end, step = 1) {
  start = Number(start);
  end = Number(end);
  step = Number(step);
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step)) return [];
  if (step === 0) return [];
  const out = [];
  if (step > 0) {
    for (let x = start; x <= end; x += step) out.push(x);
  } else {
    for (let x = start; x >= end; x += step) out.push(x);
  }
  return out;
}

// moving average
function movingAverage(arr, windowSize = 3) {
  if (!Array.isArray(arr) || windowSize <= 0) return [];
  const n = arr.length;
  const w = Math.floor(windowSize);
  if (w < 1) return [];
  const out = [];
  for (let i = 0; i < n; i++) {
    let sum = 0, count = 0;
    for (let j = i - w + 1; j <= i; j++) {
      if (j >= 0) {
        const v = Number(arr[j]);
        if (Number.isFinite(v)) {
          sum += v;
          count++;
        }
      }
    }
    out.push(count > 0 ? sum / count : NaN);
  }
  return out;
}

// quantize value to nearest step
function quantize(num, step = 1) {
  const n = Number(num); const s = Number(step);
  if (!Number.isFinite(n) || !Number.isFinite(s) || s <= 0) return NaN;
  return Math.round(n / s) * s;
}

// clamp with wrap-around (for cyclic values like angles)
function wrap(num, min, max) {
  const n = Number(num);
  if (!Number.isFinite(n)) return NaN;
  const range = max - min;
  if (range === 0) return min;
  return ((((n - min) % range) + range) % range) + min;
}

module.exports = {
  clamp,
  roundTo,
  floorTo,
  ceilTo,
  safeParseFloat,
  safeParseInt,
  degToRad,
  radToDeg,
  randomFloat,
  randomInt,
  simpleHash,
  approxEqual,
  normalize,
  lerp,
  range,
  movingAverage,
  quantize,
  wrap
};
