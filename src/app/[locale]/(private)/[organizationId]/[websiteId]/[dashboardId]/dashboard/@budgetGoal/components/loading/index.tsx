import { Box, Paper, Skeleton } from '@mantine/core';

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
      <Box px={24} pt={24} w="100%" h="100%">
        <Skeleton height={'100%'} width={'100%'} radius="lg" opacity={'50%'} />
      </Box>
    </Paper>
  );
}
