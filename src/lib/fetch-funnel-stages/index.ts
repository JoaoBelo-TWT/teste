import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getFunnelStagesQuery } from '../apollo/queries/onboarding-funnel-stages';

export async function fetchFunnelStages(dashboardId: string) {
  try {
    const { data } = await getClient().query({
      query: getFunnelStagesQuery,
      variables: {
        dashboardId,
        first: 100
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardFunnelStagesQuery]
          }
        }
      }
    });

    return data;
  } catch (error) {
    return null;
  }
}
