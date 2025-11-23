// src/utils/dataValidation.js
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-\(\).]{7,20}$/;

function isEmail(s) {
  if (typeof s !== 'string') return false;
  return EMAIL_RE.test(s.trim());
}

function isPhone(s) {
  if (typeof s !== 'string' && typeof s !== 'number') return false;
  return PHONE_RE.test(String(s).trim());
}

function sanitizeString(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/[<>]/g, (m) => (m === '<' ? '&lt;' : '&gt;'));
}

function safeJsonParse(s) {
  if (typeof s !== 'string') return { ok: false, error: 'not a string' };
  try {
    return { ok: true, value: JSON.parse(s) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function validateSchema(obj, schema) {
  const errors = [];
  if (typeof obj !== 'object' || obj === null) {
    errors.push('object expected');
    return { valid: false, errors };
  }
  for (const k of Object.keys(schema)) {
    const rule = schema[k];
    const val = obj[k];
    if ((val === undefined || val === null) && rule.required) {
      errors.push(`${k} is required`);
      continue;
    }
    if (val === undefined || val === null) continue;
    const t = Array.isArray(val) ? 'array' : typeof val;
    if (rule.type && t !== rule.type) {
      errors.push(`${k} expected ${rule.type} but got ${t}`);
      continue;
    }
    if (rule.type === 'string') {
      if (rule.minLen !== undefined && val.length < rule.minLen) errors.push(`${k} too short`);
      if (rule.maxLen !== undefined && val.length > rule.maxLen) errors.push(`${k} too long`);
    }
    if (rule.type === 'number') {
      if (rule.min !== undefined && val < rule.min) errors.push(`${k} < min`);
      if (rule.max !== undefined && val > rule.max) errors.push(`${k} > max`);
    }
  }
  return { valid: errors.length === 0, errors };
}

module.exports = {
  isEmail,
  isPhone,
  sanitizeString,
  safeJsonParse,
  validateSchema
};
