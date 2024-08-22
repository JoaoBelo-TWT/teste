export function removeSpaces(str: string | undefined): string | null {
  // Check if the input is undefined
  if (str === undefined) {
    return null;
  }

  // Remove all spaces from the string
  const noSpaces = str.replace(/\s/g, '');

  // Check if the result is an empty string
  if (noSpaces.length === 0) {
    return null;
  }

  // Return the modified string if it is not empty
  return noSpaces;
}
