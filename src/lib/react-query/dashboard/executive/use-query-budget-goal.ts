// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getDashboardBudgetQuery } from '@/lib/apollo/queries/dashboard-budget-goal';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

function run(dashboardId: string) {
  return graphQLClient.request(getDashboardBudgetQuery, {
    dashboardId
  });
}

export function useQueryBudgetGoal(dashboardId: string) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.section('budget-goal', dashboardId),
    queryFn: () => run(dashboardId)
  });
}
