import { MantineColor } from '@mantine/core';

export type AreaSplitProps = {
  offset: number;
  colors: [MantineColor, MantineColor];
  id?: string;
  fillOpacity: number | undefined;
};
