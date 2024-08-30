import { Flex, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { ActivityGoal, BudgetGoal } from '@/__generated__/graphql';
import { OnboardingContinueButton } from '@/app/[locale]/(onboarding)/components/onboarding-continue-button';
import { GoalsList } from '@/components/lists/goals-list';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { getQueryGoals } from '@/lib/react-query/goals/query-goals';
import { getMe } from '@/lib/react-query/user/query-me';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { OnboardingQueryParamsProps } from '@/types/constants/onboarding-query-params';

import { BackRemoveDashboardButton } from './components/back-remove-dashboard';
import classes from './index.module.css';

export default async function GoalsPage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string };
  searchParams: OnboardingQueryParamsProps;
}>) {
  const t = await getTranslations();
  const { dashboardId } = params;
  const { flow } = searchParams;
  const user = await getMe();
  const isOnboarding = !!user.me.currentOnboardingPath;
  const { budgetGoals, activityGoals } = await getQueryGoals(dashboardId);

  const budget = budgetGoals.edges.find((edge) => !!edge)?.node;
  const activity = activityGoals.edges.find((edge) => !!edge)?.node;

  const steps = [
    { label: t('onboarding.dashboard.stepper') },
    { label: t('onboarding.dashboard.goals.title') },
    { label: t('onboarding.dashboard.defineFunnel.stepper') }
  ];

  return (
    <ProgressContainer
      leftHeaderContent={<BackRemoveDashboardButton dashboardId={dashboardId} />}
      activeStep={1}
      steps={steps}
      backToDashboard
      padded
    >
      <Flex align="start" maw={600} direction="column">
        <div className={classes['goals__title-container']}>
          <Title order={2}>{t('onboarding.dashboard.goals.title')}</Title>
          <div className={classes['goals__description-container']}>
            <Text fz="body1" lh="body2">
              {t('onboarding.dashboard.goals.text1')}
            </Text>
            <Text fz="body1" lh="body2">
              {t('onboarding.dashboard.goals.text2')}
            </Text>
          </div>
        </div>
        <div className={classes['goals__list-container']}>
          <Text c="dark.6" px={16} fz="caption2" tt="uppercase">
            {t('common.suggested')}
          </Text>
          <GoalsList
            isOnboarding
            dashboardId={dashboardId}
            budget={budget as BudgetGoal}
            activity={activity as ActivityGoal}
          />
        </div>

        <OnboardingContinueButton
          mt={SPACING.xl}
          isOnboarding={isOnboarding}
          text={t('common.continue')}
          href={routes.dashboard.dashboardCreate.customerFunnel.path(
            params.organizationId,
            params.websiteId,
            params.dashboardId,
            flow
          )}
        />
      </Flex>
    </ProgressContainer>
  );
}
