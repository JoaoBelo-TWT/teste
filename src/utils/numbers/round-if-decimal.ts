type RoundIfDecimalParams = {
  value: number | string;
  digitsToRound?: number;
};

export function roundIfDecimal({ value, digitsToRound = 2 }: RoundIfDecimalParams): number {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  if (Number.isInteger(numericValue)) {
    // If the number is an integer, no need to round
    return numericValue;
  }

  return parseFloat(numericValue.toFixed(digitsToRound));
}
