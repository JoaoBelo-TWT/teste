// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { ChannelPerformanceSorting, DashboardTimeframe } from '@/__generated__/graphql';
import { getDashboardChanelPerformanceQuery } from '@/lib/apollo/queries/dashboard-channel-performance';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

interface Props {
  dashboardId: string;
  dashboardTimeframe: DashboardTimeframe;
  channelSorting: ChannelPerformanceSorting;
}
function run({ dashboardId, dashboardTimeframe, channelSorting }: Props) {
  return graphQLClient.request(getDashboardChanelPerformanceQuery, {
    dashboardId,
    dashboardTimeframe,
    channelPerformanceSorting: channelSorting
  });
}

export function useQueryChannelPerformance(params: Props) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.section(
      'channel-performance',
      params.dashboardId,
      params.dashboardTimeframe,
      params.channelSorting
    ),
    queryFn: () => run(params)
  });
}
