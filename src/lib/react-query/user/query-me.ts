// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getMeQuery } from '@/lib/apollo/queries/me';
import { graphQLClient } from '@/lib/graphql/client';
import { meKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run() {
  return graphQLClient.request(getMeQuery);
}

const options = {
  queryKey: meKeys.all,
  queryFn: run,
  staleTime: () => Infinity
};

export function useMe() {
  return useSuspenseQuery(options);
}
export async function getMe() {
  return getQueryClient().fetchQuery(options);
}
