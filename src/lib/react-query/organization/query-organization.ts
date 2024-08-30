import { getOrganizationQuery } from '@/lib/apollo/queries/dashboard-organization';
import { graphQLClient } from '@/lib/graphql/client';
import { organizationKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(organizationId: string) {
  return graphQLClient.request(getOrganizationQuery, {
    organizationId
  });
}

export async function getQueryOrganization(organizationId: string) {
  return getQueryClient().fetchQuery({
    queryKey: organizationKeys.single(organizationId),
    queryFn: () => run(organizationId),
    staleTime: () => Infinity
  });
}
