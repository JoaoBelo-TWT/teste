import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getWebsitesQuery } from '../apollo/queries/dashboard-websites';

export const fetchWebsitesData = async (organizationId?: string) => {
  try {
    const { data } = await getClient().query({
      query: getWebsitesQuery,
      variables: {
        first: 100,
        filters: {
          organizationId: {
            eq: organizationId
          }
        }
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.websiteQuery]
          }
        }
      }
    });

    return data;
  } catch (error) {
    return null;
  }
};
