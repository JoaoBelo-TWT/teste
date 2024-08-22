import { BreadcrumbsProps as MantineBreadcrumbsProps } from '@mantine/core';

export interface BreadcrumbsItemProps {
  label: string;
  href: string;
}

export interface BreadcrumbsProps extends Omit<MantineBreadcrumbsProps, 'children'> {
  items: BreadcrumbsItemProps[];
  variant?: 'default' | 'large';
}
