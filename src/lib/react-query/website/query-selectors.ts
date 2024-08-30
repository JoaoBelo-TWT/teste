// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getWebsiteSelectors } from '@/lib/apollo/queries/website-selectors';
import { graphQLClient } from '@/lib/graphql/client';
import { websiteKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(websiteId: string) {
  return graphQLClient.request(getWebsiteSelectors, {
    websiteId
  });
}

const options = (websiteId: string) => ({
  queryKey: websiteKeys.single(websiteId),
  queryFn: () => run(websiteId),
  staleTime: () => Infinity
});

export function useQueryWebsiteSelectors(websiteId: string) {
  return useSuspenseQuery(options(websiteId));
}
export async function getQueryWebsiteSelectors(websiteId: string) {
  return getQueryClient().fetchQuery(options(websiteId));
}
