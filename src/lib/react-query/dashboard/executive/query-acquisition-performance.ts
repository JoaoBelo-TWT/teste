// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { Channels, DashboardTimeframe } from '@/__generated__/graphql';
import { getDashboardAcquisitionQuery } from '@/lib/apollo/queries/dashboard-acquisition-performance';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

interface Props {
  dashboardId: string;
  dashboardTimeframe: DashboardTimeframe;
  funnelStageName?: string | undefined;
  channel?: Channels | undefined;
}
function run(params: Props) {
  return graphQLClient.request(getDashboardAcquisitionQuery, params);
}

export function useQueryAcquisitionPerformance(params: Props) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.section(
      'acquisition-performance',
      params.dashboardId,
      params.dashboardTimeframe,
      params.channel,
      params.funnelStageName
    ),
    queryFn: () => run(params)
  });
}
