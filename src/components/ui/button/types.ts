import { type ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonHref {
  href?: string;
}

export interface ButtonProps
  extends ButtonHref,
    MantineButtonProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof MantineButtonProps> {}
