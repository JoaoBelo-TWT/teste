import { Paper, Skeleton } from '@mantine/core';

import { SPACING } from '@/resources/constants';

import activityGoalCardClasses from '../activity-goal-card/index.module.css';

export function ActivityGoalSkeleton() {
  return (
    <Paper classNames={{ root: activityGoalCardClasses['activity-goal-card__root'] }}>
      <div className={activityGoalCardClasses['activity-goal-card__header']}>
        <div className={activityGoalCardClasses['activity-goal-card__header--text']}>
          <Skeleton height={18} width={150} />
          <Skeleton height={32} />
          <Skeleton height={18} />
        </div>
      </div>
      <Skeleton height={'70%'} width={'100%'} radius="lg" opacity={'50%'} mt={SPACING.md} />
    </Paper>
  );
}
