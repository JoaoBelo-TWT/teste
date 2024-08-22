import { ActionIcon } from '@mantine/core';
import { forwardRef } from 'react';

import type { IconButtonProps } from './types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ children, ...props }, ref) => (
  <ActionIcon component="button" ref={ref} radius="lg" variant="outline" {...props}>
    {children}
  </ActionIcon>
));

IconButton.displayName = 'IconButton';
