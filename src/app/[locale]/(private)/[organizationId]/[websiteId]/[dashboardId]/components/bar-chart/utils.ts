/* eslint-disable i18next/no-literal-string */

import { COLORS } from '@/resources/constants';

export const gradientsList = ['blue', 'green', 'pink', 'orange'];
export const strokeList = [COLORS.systemBlue600, COLORS.systemGreen600, COLORS.flatPink600, COLORS.flatOrange600];
export const fillList = [COLORS.flatBlue100, COLORS.flatGreen100, COLORS.flatPink100, COLORS.flatOrange100];

export const verticalCoordinatesGenerator = (width: number, numOfCols: number) => {
  const spacing = width / numOfCols;
  const coordinates = [];

  for (let i = 0; i < numOfCols; i += 1) {
    coordinates.push((i + 1) * spacing);
  }
  return coordinates;
};
