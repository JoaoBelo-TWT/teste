import { Paper, Skeleton } from '@mantine/core';

import budgetGoalCardClasses from '../budget-goal-card/index.module.css';

export function BudgetGoalSkeleton() {
  return (
    <Paper classNames={{ root: budgetGoalCardClasses['budget-goal-card__root'] }}>
      <div className={budgetGoalCardClasses['budget-goal-card__header']}>
        <div className={budgetGoalCardClasses['budget-goal-card__header--text']}>
          <Skeleton height={18} width={150} />
          <Skeleton height={32} />
          <Skeleton height={18} />
        </div>
      </div>
      <Skeleton height={'70%'} width={'100%'} radius="lg" opacity={'50%'} />
    </Paper>
  );
}
