import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationsQuery } from '@/lib/apollo/queries/onboarding-organizations';
import { getMe } from '@/lib/react-query/user/query-me';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { OrganizationButton } from './organizations-button';

export async function OrganizationButtonWrapper({
  organizationId,
  websiteId
}: Readonly<{ organizationId: string; websiteId: string }>) {
  const user = await getMe();
  const { data } = await getClient().query({
    query: getOrganizationsQuery,
    variables: {
      first: 100
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.onboarding.websitesQuery]
        }
      }
    }
  });

  const userAccessLevel = await useUserAccessLevel({ organizationId });

  return (
    <OrganizationButton
      organizationId={organizationId}
      websiteId={websiteId}
      activeOrganizationId={organizationId}
      data={data}
      name={`${user.me.firstName} ${user.me.lastName}`}
      role={userAccessLevel?.toLowerCase()}
    />
  );
}
