import { getClient } from '@/lib/apollo/apollo-client';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getDashboardCampaignsQuery } from '../apollo/queries/dashboard-campaigns';

export const fetchCampaigns = async (dashboardId: string, take?: number) => {
  try {
    const { data: dashboardCampaignsData } = await getClient().query({
      query: getDashboardCampaignsQuery,
      variables: {
        dashboardId,
        dashboardTimeframe: DashboardQueryParams.timeframe.default,
        status: DashboardQueryParams.campaignStatus.default,
        sorting: DashboardQueryParams.campaignSorting.default,
        take: take ?? 4
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardCampaignsQuery]
          }
        }
      }
    });

    return dashboardCampaignsData;
  } catch (error) {
    return null;
  }
};
