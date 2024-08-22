import { getClient } from '@/lib/apollo/apollo-client';
import { getDashboardChanelPerformanceQuery } from '@/lib/apollo/queries/dashboard-channel-performance';
import { DashboardQueryParams, DashboardQueryParamsProps } from '@/types/constants/dashboard-query-params';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { isConnectedToCRM } from '@/utils/crm-connection-status';

import { DashboardPathParams } from '../types';

import ChannelPerformance from './components/channel-performance';

export default async function Page({
  params
}: Readonly<{
  params: DashboardPathParams;
  searchParams: DashboardQueryParamsProps;
}>) {
  const { dashboardId } = params;

  const { data: dashboardChannelPerformanceData } = await getClient().query({
    query: getDashboardChanelPerformanceQuery,
    variables: {
      dashboardId,
      dashboardTimeframe: DashboardQueryParams.timeframe.default,
      channelPerformanceSorting: DashboardQueryParams.channelSorting.default
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.dashboardChannelPerformanceQuery]
        }
      }
    }
  });
  const connectedToCRM = await isConnectedToCRM(params.websiteId);
  return (
    <ChannelPerformance
      viewOnly={!connectedToCRM}
      channelPerformancesArray={dashboardChannelPerformanceData?.dashboardChannelPerformance}
    />
  );
}
