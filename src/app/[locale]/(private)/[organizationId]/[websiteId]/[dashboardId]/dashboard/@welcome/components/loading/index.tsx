import { Paper, Skeleton } from '@mantine/core';

import welcomeCardClasses from '../welcome-card/index.module.css';

import { CardListItemSkeleton } from './components/card-list-item-skeleton';
import classes from './index.module.css';

export function WelcomeSkeleton() {
  return (
    <Paper classNames={{ root: welcomeCardClasses['welcome-card__root'] }}>
      <div className={welcomeCardClasses['welcome-card__title']}>
        <Skeleton height={18} width={100} />
        <Skeleton height={100} />
      </div>
      <div className={classes['loading__list-container']}>
        <CardListItemSkeleton />
      </div>
    </Paper>
  );
}
