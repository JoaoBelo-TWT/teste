import { GetMeQuery } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getMeQuery } from '../apollo/queries/me';

export const fetchMeData = async (): Promise<GetMeQuery> => {
  const { data: meData } = await getClient().query({
    query: getMeQuery,
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.meQuery]
        }
      }
    }
  });

  return meData;
};
