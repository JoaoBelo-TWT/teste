import { ChannelFiltersDashboardEnum, DashboardTimeframe } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getChannelPerformanceDeepDiveCampaignsQuery } from '../apollo/queries/channel-performance-deep-dive-campaigns';

export const fetchChannelPerformanceDeepDiveCampaigns = async (
  dashboardId: string,
  channelName: ChannelFiltersDashboardEnum,
  dashboardTimeframe: DashboardTimeframe
) => {
  try {
    const channelPerformanceDeepDiveCampaigns = await getClient().query({
      query: getChannelPerformanceDeepDiveCampaignsQuery,
      variables: {
        dashboardId,
        channelName,
        dashboardTimeframe
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.channelPerformanceDeepDiveCampaignsQuery]
          }
        }
      }
    });

    return channelPerformanceDeepDiveCampaigns.data;
  } catch (error) {
    return null;
  }
};
