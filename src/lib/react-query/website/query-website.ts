// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getWebsiteQuery } from '@/lib/apollo/queries/website';
import { graphQLClient } from '@/lib/graphql/client';
import { websiteKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(websiteId: string) {
  return graphQLClient.request(getWebsiteQuery, {
    id: websiteId
  });
}

const options = (websiteId: string) => ({
  queryKey: websiteKeys.single(websiteId),
  queryFn: () => run(websiteId),
  staleTime: () => Infinity
});

export function useQueryWebsite(websiteId: string) {
  return useSuspenseQuery(options(websiteId));
}
export async function getQueryWebsite(websiteId: string) {
  return getQueryClient().fetchQuery(options(websiteId));
}
