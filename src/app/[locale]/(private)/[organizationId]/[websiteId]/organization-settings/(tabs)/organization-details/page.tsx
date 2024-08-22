import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { AccessLevel } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationQuery } from '@/lib/apollo/queries/dashboard-organization';
import { getOrganizationPermissions } from '@/lib/apollo/queries/organization-settings-permissions';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import OrganizationDetailsList from './components/organization-details-list';

export default async function OrganizationSettingsDetails({
  params
}: Readonly<{ params: { organizationId: string } }>) {
  const t = await getTranslations('organization-settings');

  const { data: organizationData } = await getClient().query({
    query: getOrganizationQuery,
    variables: {
      organizationId: params.organizationId
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.organizationQuery]
        }
      }
    }
  });

  const currentUserAccessLevel = (await useUserAccessLevel({ organizationId: params.organizationId })) as AccessLevel;

  const { data: permissionsData } = await getClient().query({
    query: getOrganizationPermissions,
    variables: {
      filters: {
        organizationId: {
          eq: params.organizationId
        }
      },
      take: 1
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.permissionsQuery]
        }
      }
    }
  });

  return (
    <Flex w="100%">
      <BaseCard headerProps={{ title: t('organizationTitle') }}>
        <OrganizationDetailsList
          organizationData={organizationData}
          permissionsData={permissionsData}
          viewOnly={currentUserAccessLevel !== AccessLevel.Admin}
        />
      </BaseCard>
    </Flex>
  );
}
