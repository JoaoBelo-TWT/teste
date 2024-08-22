import { ChannelFiltersDashboardEnum, DashboardTimeframe } from '@/__generated__/graphql';
import { PaginationQuery } from '@/components/ui/table/types';
import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

// eslint-disable-next-line max-len
import { getChannelPerformanceDeepDiveActivityDetailsQuery } from '../apollo/queries/channel-performance-deep-dive-activity-details';

export const fetchChannelPerformanceDeepDiveActivityDetails = async (
  dashboardId: string,
  channelName: ChannelFiltersDashboardEnum,
  dashboardTimeframe: DashboardTimeframe,
  pagination: PaginationQuery
) => {
  try {
    const channelPerformanceDeepDiveActivityDetails = await getClient().query({
      query: getChannelPerformanceDeepDiveActivityDetailsQuery,
      variables: {
        dashboardId,
        channelName,
        dashboardTimeframe,
        ...pagination
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.channelPerformanceDeepDiveActivityDetailsQuery]
          }
        }
      }
    });

    return channelPerformanceDeepDiveActivityDetails.data;
  } catch (error) {
    return null;
  }
};
