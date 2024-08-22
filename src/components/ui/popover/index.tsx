import { Box, Popover as MantinePopover, PopoverProps as MantinePopoverProps } from '@mantine/core';

import { SPACING } from '@/resources/constants';

interface PopoverProps extends MantinePopoverProps {
  label: string | React.ReactElement;
}

export function Popover(props: Readonly<PopoverProps>) {
  return (
    <MantinePopover {...props} position={props.position ?? 'bottom'} offset={6}>
      <MantinePopover.Target>
        <Box style={{ cursor: 'pointer' }}> {props.children}</Box>
      </MantinePopover.Target>
      <MantinePopover.Dropdown bd={0} c="white" bg={'var(--mantine-color-dark-8)'} p={SPACING.sm}>
        {props.label}
      </MantinePopover.Dropdown>
    </MantinePopover>
  );
}
