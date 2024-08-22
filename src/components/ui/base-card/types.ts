import { PaperProps } from '@mantine/core';

import { HeaderProps } from '../header/types';

export type BaseCardProps = {
  children?: React.ReactNode;
  topContent?: React.ReactNode;
  headerProps?: HeaderProps;
  paperProps?: PaperProps;
  id?: string;
};
