// eslint-disable-next-line import/no-extraneous-dependencies
import { getMeQuery } from '@/lib/apollo/queries/me';
import { graphQLClient } from '@/lib/graphql/client';
import { meKeys } from '@/lib/react-query/keys';

import getQueryClient from './client';

function run() {
  return graphQLClient.request(getMeQuery);
}

export async function getMe() {
  return getQueryClient().fetchQuery({
    queryKey: meKeys.all,
    queryFn: run,
    staleTime: () => Infinity
  });
}
