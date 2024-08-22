import { Box, BoxProps, Text } from '@mantine/core';

import classes from './index.module.css';
import { LabelChipProps } from './types';

export function LabelChip({ label, ...props }: BoxProps & LabelChipProps) {
  return (
    <Box bg="var(--mantine-color-dark-9)" className={classes['label-chip__container']} {...props}>
      <Text c="var(--mantine-color-dark-0)">{label}</Text>
    </Box>
  );
}
