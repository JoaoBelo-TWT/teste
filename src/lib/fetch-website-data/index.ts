import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getWebsiteQuery } from '../apollo/queries/website';

export const fetchWebsiteData = async (websiteId: string) => {
  try {
    const website = await getClient().query({
      query: getWebsiteQuery,
      variables: {
        id: websiteId
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.websiteQuery]
          }
        }
      }
    });

    return website.data;
  } catch (error) {
    return null;
  }
};
