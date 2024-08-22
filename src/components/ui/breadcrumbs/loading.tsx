import { BreadcrumbsProps, Breadcrumbs as MantineBreadcrumbs, Skeleton } from '@mantine/core';
import clsx from 'clsx';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export function LoadingBreadcrumbs({
  crumbsCount = 3,
  variant = 'default',
  ...props
}: {
  crumbsCount?: number;
  variant?: string;
  props?: BreadcrumbsProps;
}) {
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
      {Array.from({ length: Number(crumbsCount) }).map((_, index) => (
        <Skeleton w={80} h={variant === 'large' ? 60 : 16} key={index} radius={10} />
      ))}
    </MantineBreadcrumbs>
  );
}
