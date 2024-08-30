export const getLabelInterval = (data?: unknown[]): number | undefined => {
  if (data) {
    // gap for month labels
    if (data.length > 27) {
      return 3;
    }
    // gap for year and week labels
    if (data.length === 12 || data.length === 7) {
      return undefined;
    }

    // gap for 24 hours period labels
    if (data.length > 6) {
      return 2;
    }
  }

  return undefined;
};
