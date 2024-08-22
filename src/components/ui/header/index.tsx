import { Box, Title } from '@mantine/core';
import clsx from 'clsx';

import classes from './index.module.css';
import { HeaderProps } from './types';

export function Header({ children, title, titleProps, className, ...props }: Readonly<HeaderProps>) {
  return (
    <Box className={clsx(classes.header__container, className)} {...props}>
      {typeof title === 'string' ? (
        <Title order={3} {...titleProps}>
          {title}
        </Title>
      ) : (
        title
      )}
      {children}
    </Box>
  );
}
