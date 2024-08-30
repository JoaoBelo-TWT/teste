import { Skeleton } from '@mantine/core';

import classes from '../index.module.css';

export function CardsSkeleton() {
  const cards = Array.from({ length: 6 }, (_, index) => (
    <div key={index} className={classes.loading__card}>
      <Skeleton height={140} width={'auto'} radius={'md'} />
    </div>
  ));

  return <>{cards}</>;
}
