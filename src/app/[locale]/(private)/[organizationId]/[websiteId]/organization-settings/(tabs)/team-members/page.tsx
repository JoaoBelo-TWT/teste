import { getTranslations } from 'next-intl/server';

import { SortingOrder } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationQuery } from '@/lib/apollo/queries/dashboard-organization';
import { getOrganizationPermissions } from '@/lib/apollo/queries/organization-settings-permissions';
import { getMe } from '@/lib/react-query/user/query-me';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { InviteTeamMembersButton } from '../../components/invite-team-members-button';
import { TeamMembersTable } from '../../components/team-members-table';

import classes from './index.module.css';
import { OrganizationSettingsTeamMembersProps } from './types';

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_SORTING_FIELD = 'id';
const DEFAULT_SORTING_DIRECTION = SortingOrder.Desc;

export default async function OrganizationSettingsTeamMembers({
  params,
  searchParams
}: Readonly<OrganizationSettingsTeamMembersProps>) {
  const t = await getTranslations('organization-settings');
  const { pageIndex, pageSize, sortingField, sortingDirection } = searchParams;
  const currentPageIndex = Number(pageIndex) || DEFAULT_PAGE_INDEX;
  const currentPageSize = Number(pageSize) || DEFAULT_PAGE_SIZE;
  const currentSortingField = sortingField ?? DEFAULT_SORTING_FIELD;
  const currentSortingDirection = sortingDirection ?? DEFAULT_SORTING_DIRECTION;
  const user = await getMe();

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

  const currentUserAccessLevel = await useUserAccessLevel({ organizationId: params.organizationId });

  const after = currentPageSize * currentPageIndex;

  const { data: permissionsData } = await getClient().query({
    query: getOrganizationPermissions,
    variables: {
      filters: {
        organizationId: {
          eq: params.organizationId
        }
      },
      take: currentPageSize,
      skip: after,
      sorting: {
        field: currentSortingField,
        order: currentSortingDirection
      }
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
    <div className={classes['team-members']}>
      <BaseCard
        headerProps={{
          title: t('teamMembersTitle'),
          children: <InviteTeamMembersButton currentUserAccessLevel={currentUserAccessLevel} />
        }}
      >
        <div className={classes['team-members__team-members-container']}>
          <TeamMembersTable
            currentUserAccessLevel={currentUserAccessLevel}
            permissions={permissionsData}
            userId={user.me.id}
            ownerId={organizationData.organization.user.id}
            pageIndexParam={currentPageIndex}
            pageSizeParam={currentPageSize}
            sortingDirectionParam={currentSortingDirection}
            sortingFieldParam={currentSortingField}
          />
        </div>
      </BaseCard>
    </div>
  );
}
