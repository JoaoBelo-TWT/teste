// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getDashboardActivityQuery } from '@/lib/apollo/queries/dashboard-activity-goal';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

function run(dashboardId: string) {
  return graphQLClient.request(getDashboardActivityQuery, {
    dashboardId
  });
}

export function useQueryActivity(dashboardId: string) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.section('activity', dashboardId),
    queryFn: () => run(dashboardId)
  });
}
