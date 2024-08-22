import { AccessLevel } from '@/__generated__/graphql';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { fetchBudgetGoal } from '@/lib/fetch-budget-goal';

import { DashboardPathParams } from '../types';

import BudgetGoalCard from './components/budget-goal-card';
import BudgetGoalEmptyState from './components/empty-state';

export default async function Page({
  params
}: Readonly<{
  params: DashboardPathParams;
}>) {
  const { dashboardId, organizationId } = params;

  const [data, userAccessLevel] = await Promise.all([
    fetchBudgetGoal(dashboardId),
    useUserAccessLevel({ organizationId })
  ]);

  const isUserAdminOrEditor = userAccessLevel === AccessLevel.Admin || userAccessLevel === AccessLevel.Write;

  return (
    <>
      {data?.dashboardBudget.isSetup ? (
        <BudgetGoalCard dashboardBudget={data?.dashboardBudget} userHasAdminOrEditorAccess={isUserAdminOrEditor} />
      ) : (
        <BudgetGoalEmptyState params={params} />
      )}
    </>
  );
}
