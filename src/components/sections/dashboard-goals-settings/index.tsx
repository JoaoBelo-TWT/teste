import { Box, Divider, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { ActivityGoal, BudgetGoal } from '@/__generated__/graphql';
import { GoalsList } from '@/components/lists/goals-list';
import { fetchDashboardGoals } from '@/lib/fetch-dashboard-goals';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export async function DashboardGoalsSettings({ dashboardId, viewOnly }: { dashboardId: string; viewOnly?: boolean }) {
  const t = await getTranslations();
  const data = await fetchDashboardGoals(dashboardId);

  const budget = data?.budgetGoals.edges.find((edge) => !!edge)?.node;
  const activity = data?.activityGoals.edges.find((edge) => !!edge)?.node;

  return (
    <Box id={`goals-${dashboardId}`} className={classes['dashboard-goals-settings']}>
      <Text fw={500}>{t('common.goals')}</Text>
      <Text maw={500} c="dark.7" className={classes['dashboard-goals-settings__description']}>
        {t('onboarding.dashboard.goals.text1')}
      </Text>
      <Box mb={SPACING.xl}>
        <GoalsList
          isEdit
          viewOnly={viewOnly}
          dashboardId={dashboardId}
          budget={budget as BudgetGoal}
          activity={activity as ActivityGoal}
        />
      </Box>
      <Divider />
    </Box>
  );
}
