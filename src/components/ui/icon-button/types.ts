import { ActionIconProps } from '@mantine/core';

export interface IconButtonProps
  extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {}
