export const truncateString = (textToUpdate: string, maxLength: number, terminator?: string): string => {
  if (textToUpdate.length > maxLength) {
    return `${textToUpdate.slice(0, maxLength - 1)}${terminator ?? '...'}`;
  }
  return textToUpdate;
};
