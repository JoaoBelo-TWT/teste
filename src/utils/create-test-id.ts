export function createTestId(input?: string): string | undefined {
  // Replace spaces with dashes
  const stringWithDashes = input?.replace(/\s+/g, '-');
  // Convert all letters to lowercase
  const lowercasedString = stringWithDashes?.toLowerCase();

  return lowercasedString;
}
