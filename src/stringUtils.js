class StringUtils {
  static safeTrim(v) {
    if (typeof v !== 'string') return '';
    return v.trim();
  }

  static normalizeWhitespace(v) {
    const t = this.safeTrim(v);
    return t === '' ? '' : t.replace(/\s+/g, ' ');
  }

  static toTitleCase(v) {
    const t = this.normalizeWhitespace(v);
    if (t === '') return '';

    return t
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  static ensureSuffix(v, suffix) {
    const t = this.safeTrim(v);
    if (t === '') return suffix || '';
    if (!suffix) return t;
    if (t.endsWith(suffix)) return t;
    return t + suffix;
  }

  static maskSensitive(v, prefix = 2, suffix = 2) {
    const t = this.safeTrim(v);
    const len = t.length;
    if (len === 0) return '';
    if (len <= prefix + suffix) return '*'.repeat(len);

    const start = t.slice(0, prefix);
    const end = t.slice(len - suffix);
    const mid = '*'.repeat(len - prefix - suffix);
    return start + mid + end;
  }
}

module.exports = StringUtils;
