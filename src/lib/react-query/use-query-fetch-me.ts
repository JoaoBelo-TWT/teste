// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getMeQuery } from '@/lib/apollo/queries/me';
import { graphQLClient } from '@/lib/graphql/client';
import { meKeys } from '@/lib/react-query/keys';

function run() {
  return graphQLClient.request(getMeQuery);
}

export function useMe() {
  return useSuspenseQuery({
    queryKey: meKeys.all,
    queryFn: run,
    staleTime: () => Infinity
  });
}
