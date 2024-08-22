import type { CardProps as MantineCardProps } from '@mantine/core';
import { Url } from 'next/dist/shared/lib/router/router';

export type CardProps = {
  imageSrc: string;
  imageAtl: string;
  title: string;
  description: string | number;
  widgets: string | number;
  imageBgColor: string;
  href?: Url;
  tooltip?: string;
} & MantineCardProps;
