// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { getDashboardCustomerJourneyQuery } from '@/lib/apollo/queries/dashboard-customer-journey';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

interface Props {
  dashboardId: string;
  dashboardTimeframe: DashboardTimeframe;
}
function run(params: Props) {
  return graphQLClient.request(getDashboardCustomerJourneyQuery, params);
}

export function useQueryFunnelPerformance(params: Props) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.section('funnel-performance', params.dashboardId, params.dashboardTimeframe),
    queryFn: () => run(params)
  });
}
