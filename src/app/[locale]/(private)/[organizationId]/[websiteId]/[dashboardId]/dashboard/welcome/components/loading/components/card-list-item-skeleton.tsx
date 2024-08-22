import { Skeleton } from '@mantine/core';

import classes from '../index.module.css';

export function CardListItemSkeleton() {
  const cardListItems = Array.from({ length: 4 }, (_, index) => (
    <div className={classes['loading__list-item']} key={index}>
      <Skeleton height={18} />
      <Skeleton height={34} />
    </div>
  ));

  return <>{cardListItems}</>;
}
