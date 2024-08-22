import { BoxProps, TitleProps } from '@mantine/core';
import { ReactElement, ReactNode, ReactPortal } from 'react';

export type HeaderProps = BoxProps & {
  title: ReactNode | ReactElement | ReactPortal | string;
  children?: ReactNode;
  titleProps?: TitleProps;
  className?: string;
};
