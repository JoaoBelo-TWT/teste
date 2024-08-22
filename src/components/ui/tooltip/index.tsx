import { Tooltip as MantineTooltip, TooltipProps as MantineTooltipProps } from '@mantine/core';

import { SPACING } from '@/resources/constants';

export function Tooltip(props: Readonly<MantineTooltipProps>) {
  return (
    <MantineTooltip
      {...props}
      position={props.position ?? 'bottom'}
      multiline={props.multiline ?? true}
      p={SPACING.sm}
      fz={14}
      lh={1.3}
      bg={props.bg ?? 'var(--mantine-color-dark-8)'}
    />
  );
}
