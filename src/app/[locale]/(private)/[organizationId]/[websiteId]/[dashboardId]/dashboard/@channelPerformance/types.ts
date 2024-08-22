import { MantineColor } from '@mantine/core';

export type RingProgressSection = {
  value: number;
  color: MantineColor;
  tooltip?: React.ReactNode;
  title: string;
  cardColor: string;
};

export type HeaderButtonsProps = {
  funnelsFilterOptions: {
    value: string;
    label: string;
  }[];
};
