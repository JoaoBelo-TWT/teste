import { DashboardTimeframe } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getDashboardCustomerJourneyQuery } from '../apollo/queries/dashboard-customer-journey';

export async function fetchFunnels(dashboardId: string, timeframe?: DashboardTimeframe) {
  try {
    const { data: dashboardFunnels } = await getClient().query({
      query: getDashboardCustomerJourneyQuery,
      variables: {
        dashboardId,
        dashboardTimeframe: timeframe ?? DashboardQueryParams.timeframe.default
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardCustomerJourneyQuery]
          }
        }
      }
    });

    return dashboardFunnels;
  } catch (error) {
    return null;
  }
}
