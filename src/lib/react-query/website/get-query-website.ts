import { getWebsiteQuery } from '@/lib/apollo/queries/website';
import { graphQLClient } from '@/lib/graphql/client';
import { websiteKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(websiteId: string) {
  return graphQLClient.request(getWebsiteQuery, {
    id: websiteId
  });
}

export async function getQueryWebsite(websiteId: string) {
  return getQueryClient().fetchQuery({
    queryKey: websiteKeys.single(websiteId),
    queryFn: () => run(websiteId)
  });
}
