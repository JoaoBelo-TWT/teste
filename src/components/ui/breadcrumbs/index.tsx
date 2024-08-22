'use client';

import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';
import { BreadcrumbsProps } from './types';

function getBasePath(url: string): string {
  const queryIndex = url.indexOf('?');
  const anchorIndex = url.indexOf('#');

  let endIndex = url.length;
  if (queryIndex !== -1) {
    endIndex = queryIndex;
  }
  if (anchorIndex !== -1 && anchorIndex < endIndex) {
    endIndex = anchorIndex;
  }

  return url.substring(0, endIndex).replaceAll('/', '');
}

export function Breadcrumbs({ items, variant = 'default', ...props }: Readonly<BreadcrumbsProps>) {
  const pathname = usePathname();
  const currentPath = `${pathname?.split('/').slice(2).join('')}`;

  return (
    <MantineBreadcrumbs
      className={clsx(classes.breadcrumbs, variant === 'large' && classes['breadcrumbs--large'])}
      separatorMargin={SPACING.xxs}
      separator={
        variant === 'large' ? (
          <div className={classes.breadcrumbs__divider}>
            <div className={classes['breadcrumbs__divider-content']} />
          </div>
        ) : (
          '/'
        )
      }
      {...props}
    >
      {items.map((item, index) => (
        <Anchor
          key={index}
          component={Link}
          href={item.href}
          underline="hover"
          className={clsx(
            variant === 'large' && classes['breadcrumbs__crumb--large'],
            getBasePath(item.href) === currentPath &&
              variant === 'large' &&
              classes['breadcrumbs__crumb--selected-large'],
            getBasePath(item.href) === currentPath && variant !== 'large'
              ? classes['breadcrumbs__crumb--selected']
              : classes.breadcrumbs__crumb
          )}
        >
          {item.label}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
}
