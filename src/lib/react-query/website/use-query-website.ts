// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getWebsiteQuery } from '@/lib/apollo/queries/website';
import { graphQLClient } from '@/lib/graphql/client';
import { websiteKeys } from '@/lib/react-query/keys';

function run(websiteId: string) {
  return graphQLClient.request(getWebsiteQuery, {
    id: websiteId
  });
}

export function useQueryWebsite(websiteId: string) {
  return useSuspenseQuery({
    queryKey: websiteKeys.single(websiteId),
    queryFn: () => run(websiteId),
    staleTime: () => Infinity
  });
}
