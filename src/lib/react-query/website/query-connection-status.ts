import { useSuspenseQuery } from '@tanstack/react-query';

import { getSourceConnectionStatusQuery } from '@/lib/apollo/queries/website-connection-status';
import { graphQLClient } from '@/lib/graphql/client';
import { websiteKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(websiteId: string) {
  return graphQLClient.request(getSourceConnectionStatusQuery, {
    websiteId
  });
}

const options = (websiteId: string) => ({
  queryKey: websiteKeys.connectionStatus(websiteId),
  queryFn: () => run(websiteId)
});

export function useQueryConnectionStatus(websiteId: string) {
  return useSuspenseQuery(options(websiteId));
}

export function getQueryConnectionStatus(websiteId: string) {
  return getQueryClient().fetchQuery(options(websiteId));
}
