import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import topSourcesCardClasses from '../../top-sources-card/index.module.css';
import classes from '../index.module.css';

export function TopSourcesCardSkeleton() {
  const avatarSize = 56;
  const avatars = Array.from({ length: 4 }, (_, index) => (
    <div key={index} className={classes.loading__avatar}>
      <Skeleton height={avatarSize} circle />
    </div>
  ));

  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={150} />
      }}
      paperProps={{ classNames: { root: topSourcesCardClasses['top-sources-card__card-root'] } }}
    >
      <div className={topSourcesCardClasses['top-sources-card__avatars-container']}>
        <div>{avatars}</div>
        <Skeleton height={24} width={30} />
      </div>
    </BaseCard>
  );
}
