import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getWebsiteSelectors } from '../apollo/queries/website-selectors';

export async function fetchSelectors(websiteId: string) {
  try {
    const { data } = await getClient().query({
      query: getWebsiteSelectors,
      variables: {
        websiteId
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.websiteSelectorsQuery]
          }
        }
      }
    });

    return data;
  } catch (error) {
    return null;
  }
}
