import { ActionIcon } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { Tooltip } from '@/components/ui/tooltip';

import { IconButtonProps } from './types';

export function IconButton({ children, href, prefetch, onClick, tooltip, ...props }: Readonly<IconButtonProps>) {
  const wrappedChildren = tooltip ? (
    <Tooltip w="auto" label={tooltip}>
      {children}
    </Tooltip>
  ) : (
    children
  );
  if (href) {
    return (
      <ActionIcon component={Link} radius="lg" variant="outline" href={href} {...props} prefetch={prefetch}>
        {wrappedChildren}
      </ActionIcon>
    );
  }

  if (onClick) {
    return (
      <ActionIcon radius="lg" variant="outline" {...props} onClick={onClick}>
        {wrappedChildren}
      </ActionIcon>
    );
  }

  return (
    <ActionIcon radius="lg" variant="outline" {...props}>
      {wrappedChildren}
    </ActionIcon>
  );
}
