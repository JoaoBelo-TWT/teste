import { ChannelFiltersDashboardEnum, DashboardTimeframe } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getChannelPerformanceDeepDiveOverviewQuery } from '../apollo/queries/channel-performance-deep-dive-overview';

export const fetchChannelPerformanceDeepDiveOverview = async (
  dashboardId: string,
  channelName: ChannelFiltersDashboardEnum,
  dashboardTimeframe: DashboardTimeframe
) => {
  try {
    const channelPerformanceDeepDiveOverview = await getClient().query({
      query: getChannelPerformanceDeepDiveOverviewQuery,
      variables: {
        dashboardId,
        channelName,
        dashboardTimeframe
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.channelPerformanceDeepDiveOverviewQuery]
          }
        }
      }
    });

    return channelPerformanceDeepDiveOverview.data;
  } catch (error) {
    return null;
  }
};
