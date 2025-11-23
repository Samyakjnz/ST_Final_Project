// src/utils/searchUtils.js
function binarySearch(sortedArr, comparator) {
  if (!Array.isArray(sortedArr) || typeof comparator !== 'function') throw new Error('bad args');
  let lo = 0, hi = sortedArr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const cmp = comparator(sortedArr[mid], mid);
    if (cmp === 0) return mid;
    if (cmp < 0) hi = mid - 1;
    else lo = mid + 1;
  }
  return -lo - 1;
}

function binarySearchByKey(sortedArr, key, target) {
  return binarySearch(sortedArr, (v) => {
    if (v[key] === target) return 0;
    return v[key] > target ? -1 : 1;
  });
}

function wildcardMatch(pattern, text) {
  if (typeof pattern !== 'string' || typeof text !== 'string') return false;

  // Escape special regex chars EXCEPT * and ?
  const escaped = pattern.replace(/([.+^${}()|[\]\\])/g, '\\$1');

  // Convert wildcard chars
  const regexStr = '^' +
    escaped
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.') +
    '$';

  return new RegExp(regexStr, 'i').test(text);
}


function fuzzyContains(text, query) {
  if (!query) return true;
  if (!text) return false;
  const s = String(text).toLowerCase();
  const q = String(query).toLowerCase();
  let i = 0, j = 0;
  while (i < s.length && j < q.length) {
    if (s[i] === q[j]) j++;
    i++;
  }
  return j === q.length;
}

function multiFieldFilter(arr, fields, pattern) {
  if (!Array.isArray(arr)) return [];
  const pat = (pattern || '').trim();
  if (!pat) return arr.slice();
  return arr.filter(item => {
    return fields.some(f => {
      const v = item && (typeof item[f] === 'string' ? item[f] : String(item[f] || ''));
      return wildcardMatch(pat, v) || fuzzyContains(v, pat);
    });
  });
}

function partition(arr, predicate) {
  const left = [], right = [];
  for (let i = 0; i < arr.length; i++) {
    (predicate(arr[i], i) ? left : right).push(arr[i]);
  }
  return [left, right];
}

module.exports = {
  binarySearch,
  binarySearchByKey,
  wildcardMatch,
  fuzzyContains,
  multiFieldFilter,
  partition
};
