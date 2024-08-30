import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { GetNotificationsQuery } from '@/__generated__/graphql';
import { getWebsiteNotificationsQuery } from '@/lib/apollo/queries/website-notifications';
import { graphQLClient } from '@/lib/graphql/client';
import { notificationKeys } from '@/lib/react-query/keys';

export type PartialDashboardQueryParamsAlt = {
  websiteId: string;
  first: number;
  after?: string;
};

function run(params: PartialDashboardQueryParamsAlt, after: string | null): Promise<GetNotificationsQuery> {
  if (after) {
    // eslint-disable-next-line no-param-reassign
    params.after = after;
  }
  return graphQLClient.request(getWebsiteNotificationsQuery, params);
}

export function useQueryPaginatedNotifications(params: PartialDashboardQueryParamsAlt) {
  return useSuspenseInfiniteQuery({
    queryKey: notificationKeys.paginated(params.websiteId, params.first),
    queryFn: ({ pageParam = null }) => run(params, pageParam),
    getNextPageParam: (lastPage: GetNotificationsQuery) =>
      lastPage.notifications.pageInfo.hasNextPage ? lastPage.notifications.pageInfo.endCursor : undefined,
    select: (data) => ({
      ...data,
      pages: data.pages
        .flat()
        .map((value) => value.notifications.edges)
        .flat()
    }),
    initialPageParam: null
  });
}
