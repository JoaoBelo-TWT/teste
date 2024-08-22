import { Button as MantineButton } from '@mantine/core';
import Link from 'next/link';
import React, { forwardRef } from 'react';

import classes from './index.module.css';
import { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, href, ...props }, ref) => {
  if (href) {
    return (
      <MantineButton
        component={Link}
        classNames={{
          root: classes.button__root
        }}
        autoContrast
        fw={400}
        ta="center"
        radius="xxl"
        lts={0}
        ref={null}
        href={href}
        variant={props.variant ?? 'filled'}
        loading={props.loading}
        disabled={props.disabled}
        ml={props.ml}
        size={props.size}
        mih={props.mih}
        miw={props.miw}
        mt={props.mt}
      >
        {children}
      </MantineButton>
    );
  }

  return (
    <MantineButton
      classNames={{
        root: classes.button__root
      }}
      autoContrast
      fw={400}
      ta="center"
      radius="xxl"
      lts={0}
      ref={ref}
      variant={props.variant ?? 'filled'}
      {...props}
    >
      {children}
    </MantineButton>
  );
});

Button.displayName = 'Button';
