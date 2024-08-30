import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { GetWebsitesQuery, GetWebsitesQueryVariables } from '@/__generated__/graphql';
import { getWebsitesQuery } from '@/lib/apollo/queries/dashboard-websites';
import { graphQLClient } from '@/lib/graphql/client';
import { websiteKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(params: GetWebsitesQueryVariables, after: string | null): Promise<GetWebsitesQuery> {
  if (after) {
    // eslint-disable-next-line no-param-reassign
    params.after = after;
  }
  return graphQLClient.request(getWebsitesQuery, params);
}

export function useQueryPaginatedWebsites(params: GetWebsitesQueryVariables) {
  return useSuspenseInfiniteQuery({
    queryKey: websiteKeys.paginated(params),
    queryFn: ({ pageParam = null }) => run(params, pageParam),
    getNextPageParam: (lastPage: GetWebsitesQuery) =>
      lastPage.websites.edges.length <= (params.first as number)
        ? lastPage.websites.edges[lastPage.websites.edges.length - 1].node.id
        : undefined,
    select: (data) => ({
      ...data,
      pages: data.pages
        .flat()
        .map((value) => value.websites.edges)
        .flat()
    }),
    initialPageParam: null
  });
}

export function getQueryPaginatedWebsites(params: GetWebsitesQueryVariables) {
  return getQueryClient().fetchInfiniteQuery<GetWebsitesQuery, Error, GetWebsitesQuery>({
    queryKey: websiteKeys.paginated(params),
    queryFn: ({ pageParam = null }) => run(params, pageParam as string | null),
    getNextPageParam: (lastPage: GetWebsitesQuery) => {
      const lastEdge = lastPage.websites.edges[lastPage.websites.edges.length - 1];
      return lastEdge ? lastEdge.node.id : undefined;
    },
    initialPageParam: null
  });
}
