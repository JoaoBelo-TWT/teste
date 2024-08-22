import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getDashboardQuery } from '../apollo/queries/dashboard';

export const fetchDashboardData = async (dashboardId: string) => {
  try {
    const { data: dashboardData } = await getClient().query({
      query: getDashboardQuery,
      variables: {
        dashboardId
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardsQuery]
          }
        }
      }
    });

    return dashboardData;
  } catch (error) {
    return null;
  }
};
