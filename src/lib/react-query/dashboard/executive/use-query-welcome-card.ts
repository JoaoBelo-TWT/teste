// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { getDashboardOverviewQuery } from '@/lib/apollo/queries/dashboard-overview';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

interface Props {
  dashboardId: string;
  dashboardTimeframe: DashboardTimeframe;
}
function run(params: Props) {
  return graphQLClient.request(getDashboardOverviewQuery, params);
}

export function useQueryWelcomeCard(params: Props) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.section('welcome-card', params.dashboardId, params.dashboardTimeframe),
    queryFn: () => run(params)
  });
}
