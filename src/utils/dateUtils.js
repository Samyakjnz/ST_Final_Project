// src/utils/dateUtils.js
const DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];

function isLeapYear(year) {
  if (!Number.isInteger(year)) return false;
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

function parseDate(input) {
  if (input === null || input === undefined) return null;
  if (input instanceof Date) {
    const d = new Date(input.getTime());
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof input === 'number') {
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof input !== 'string') return null;
  const s = input.trim();
  let m = s.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
  if (m) {
    const y = Number(m[1]), mo = Number(m[2]), da = Number(m[3]);
    const dt = new Date(Date.UTC(y, mo - 1, da));
    return isNaN(dt.getTime()) ? null : dt;
  }
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const da = Number(m[1]), mo = Number(m[2]), y = Number(m[3]);
    const dt = new Date(Date.UTC(y, mo - 1, da));
    return isNaN(dt.getTime()) ? null : dt;
  }
  const fallback = new Date(s);
  return isNaN(fallback.getTime()) ? null : fallback;
}

function formatDate(date, fmt = 'YYYY-MM-DD') {
  const d = (date instanceof Date) ? new Date(date.getTime()) : parseDate(date);
  if (!d) return null;
  const Y = d.getUTCFullYear();
  const M = d.getUTCMonth() + 1;
  const D = d.getUTCDate();
  const hh = d.getUTCHours();
  const mm = d.getUTCMinutes();
  const ss = d.getUTCSeconds();
  const pad = (n, w = 2) => String(n).padStart(w, '0');
  return fmt
    .replace('YYYY', String(Y))
    .replace('MM', pad(M))
    .replace('DD', pad(D))
    .replace('hh', pad(hh))
    .replace('mm', pad(mm))
    .replace('ss', pad(ss));
}

function diffInDays(a, b) {
  const da = parseDate(a);
  const db = parseDate(b);
  if (!da || !db) return null;
  const ms = da.getTime() - db.getTime();
  return ms / (1000 * 60 * 60 * 24);
}

function add(date, { days = 0, months = 0, years = 0 } = {}) {
  const d = parseDate(date);
  if (!d) return null;
  let year = d.getUTCFullYear() + Number(years);
  let month = d.getUTCMonth() + Number(months);
  let day = d.getUTCDate() + Number(days);
  year += Math.floor(month / 12);
  month = ((month % 12) + 12) % 12;
  let maxDay = DAYS_IN_MONTH[month];
  if (month === 1 && isLeapYear(year)) maxDay = 29;
  if (day > maxDay) day = maxDay;
  if (day < 1) day = 1;
  return new Date(Date.UTC(year, month, day, d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()));
}

function humanDiff(a, b) {
  const da = parseDate(a);
  const db = parseDate(b);
  if (!da || !db) return null;
  let sign = 1;
  let x = new Date(da.getTime()), y = new Date(db.getTime());
  if (x < y) { sign = -1; [x, y] = [y, x]; }
  let years = x.getUTCFullYear() - y.getUTCFullYear();
  let months = x.getUTCMonth() - y.getUTCMonth();
  let days = x.getUTCDate() - y.getUTCDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = (x.getUTCMonth() - 1 + 12) % 12;
    const yearForPrev = x.getUTCMonth() === 0 ? x.getUTCFullYear() - 1 : x.getUTCFullYear();
    let maxDay = DAYS_IN_MONTH[prevMonth];
    if (prevMonth === 1 && isLeapYear(yearForPrev)) maxDay = 29;
    days += maxDay;
  }
  if (months < 0) { months += 12; years -= 1; }
  return { years: years * sign, months: months * sign, days: days * sign };
}

function parseDuration(s) {
  if (!s || typeof s !== 'string') return null;
  const input = s.toLowerCase();
  const out = { years: 0, months: 0, days: 0 };
  const re = /(-?\d+)\s*(y|yr|yrs|year|years|mo|m|month|months|d|day|days)/g;
  let m;
  while ((m = re.exec(input))) {
    const n = Number(m[1]); const u = m[2];
    if (/^y/.test(u)) out.years += n;
    else if (/^mo|^m$/.test(u)) out.months += n;
    else if (/^d/.test(u)) out.days += n;
  }
  return out;
}

module.exports = {
  parseDate,
  formatDate,
  diffInDays,
  add,
  humanDiff,
  parseDuration,
  isLeapYear
};
