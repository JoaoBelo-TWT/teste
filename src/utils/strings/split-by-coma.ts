/**
 * Splits a string by a comma and returns an array with the separated parts.
 * If the string doesn't contain a comma, the array will contain the original string as a single element.
 *
 */
export function splitByComma(input: string | null): string[] {
  if (input === null) {
    return [];
  }
  return input.split(',').map((part) => part.trim());
}
