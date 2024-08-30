// if value is 160, return 200, if its 2583 return 3000 etc...
// its to get the max value of magnitude for all charts
export function roundUpToNext(value: number): number {
  if (value <= 0) return 0;

  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
}
