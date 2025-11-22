const Calculator = require('./calculator');
const MathUtils = require('./mathUtils');
const StringUtils = require('./stringUtils');
const ArrayUtils = require('./arrayUtils');

function calculateAndFormatSummary(numbers, label) {
  if (!Array.isArray(numbers)) {
    throw new Error('numbers must be an array');
  }

  const calc = new Calculator();

  const total = ArrayUtils.safeSum(numbers);
  const avg = ArrayUtils.average(numbers) ?? 0;

  const clampedAvg = MathUtils.clamp(avg, -1_000_000, 1_000_000);
  const isPrime = MathUtils.isPrime(Math.round(clampedAvg));

  const cleanLabel = StringUtils.toTitleCase(label);
  const finalLabel = StringUtils.ensureSuffix(cleanLabel, ':');

  const doubled = numbers.map(n =>
    typeof n === 'number' ? calc.multiply(n, 2) : n
  );

  return {
    label: finalLabel,
    total,
    average: clampedAvg,
    isAveragePrime: isPrime,
    doubled
  };
}

module.exports = {
  Calculator,
  MathUtils,
  StringUtils,
  ArrayUtils,
  calculateAndFormatSummary
};
