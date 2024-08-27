'use client';

import { Flex, Text } from '@mantine/core';
import { ColumnDef, Getter, PaginationState, Row } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  AccessLevel,
  GetOrganizationPermissionsQuery,
  MembersInvitationStatus,
  SortingOrder
} from '@/__generated__/graphql';
import { Table } from '@/components/ui/table';
import { useSorting } from '@/hooks/use-sorting';
import { removeSpaces } from '@/utils/strings/remove-spaces';

import { PermissionsDropdown } from '../permissions-dropdown';
import { RemoveTeamMemberButton } from '../remove-member-button';

import { StatusCell } from './status-cell';
import { TeamMembersRowData } from './types';

export function TeamMembersTable({
  permissions,
  userId,
  ownerId,
  pageSizeParam,
  pageIndexParam,
  sortingFieldParam,
  sortingDirectionParam,
  currentUserAccessLevel
}: Readonly<{
  permissions: GetOrganizationPermissionsQuery;
  userId: string;
  ownerId: string;
  pageSizeParam: number;
  pageIndexParam: number;
  sortingFieldParam: string;
  sortingDirectionParam: SortingOrder;
  currentUserAccessLevel: AccessLevel | undefined;
}>) {
  const t = useTranslations('organization-settings.teamMembersTable');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: pageIndexParam,
    pageSize: pageSizeParam
  });

  const { sorting, onSortingChange, field, direction } = useSorting(sortingFieldParam, sortingDirectionParam);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const totalPageCount = Math.ceil(permissions.permissions.totalTeamMembers / pageSize);
  const data: TeamMembersRowData[] = permissions.permissions.edges.map(({ node: { user, ...others } }) => ({
    id: user.id,
    permissionId: others.id,
    name: `${user.firstName ?? ''} ${user.lastName ?? ''}`,
    email: user.email,
    accessLevel: others.accessLevel.toUpperCase() as AccessLevel,
    status: others.invitationStatus
  }));

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('pageIndex', pageIndex.toString());
    params.set('pageSize', pageSize.toString());
    if (field && direction) {
      params.set('sortingField', field);
      params.set('sortingDirection', direction);
    } else {
      params.delete('sortingField');
      params.delete('sortingDirection');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [field, direction, pageIndex, pageIndexParam, pageSize, pageSizeParam, pathname, router, searchParams]);

  const isAdmin = currentUserAccessLevel === AccessLevel.Admin;

  const provideStatusCell = useCallback(
    (row: Row<TeamMembersRowData>) => (
      <StatusCell accessLevel={row.original.accessLevel} email={row.original.email} status={row.original.status} />
    ),
    []
  );

  const providePermissionsCell = useCallback(
    (getValue: () => Getter<unknown>, row: Row<TeamMembersRowData>) => (
      <Flex>
        <PermissionsDropdown
          value={getValue() as unknown as AccessLevel}
          permissionId={row.original.permissionId}
          name={row.original.name}
          disabled={!isAdmin || row.id === userId || row.id === ownerId}
        />
      </Flex>
    ),
    [isAdmin, ownerId, userId]
  );

  const provideActionsCell = useCallback(
    (row: Row<TeamMembersRowData>) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {isAdmin && row.id !== userId && row.id !== ownerId && (
          <RemoveTeamMemberButton
            name={removeSpaces(row.original.name) ? row.original.name : row.original.email}
            permissionId={row.original.permissionId}
          />
        )}
      </div>
    ),
    [isAdmin, ownerId, userId]
  );

  const columns: ColumnDef<TeamMembersRowData>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('teamMember'),
        enableSorting: false,
        cell: ({ getValue, row }) => {
          const teamMemberName = getValue() as string;
          const isYou = row.id === userId;
          const isOwner = row.id === ownerId;

          return (
            <Text miw="13vw" fz="body2">
              {t('displayName', { teamMemberName, isOwner, isYou })}
            </Text>
          );
        }
      },
      {
        accessorKey: 'email',
        enableSorting: false,
        header: t('emailAddress')
      },
      {
        accessorKey: 'accessLevel',
        header: t('accountPermissions'),
        cell: ({ getValue, row }) => providePermissionsCell(() => getValue, row)
      },
      {
        accessorKey: 'status',
        enableSorting: false,
        header: t('status'),
        cell: ({ row }) => {
          const isYou = row.id === userId;
          const isOwner = row.id === ownerId;
          if (isYou && isOwner) {
            return (
              <StatusCell
                accessLevel={row.original.accessLevel}
                email={row.original.email}
                status={MembersInvitationStatus.Active}
              />
            );
          }
          return provideStatusCell(row);
        }
      },
      {
        id: 'actions',
        enableSorting: false,
        cell: ({ row }) => provideActionsCell(row)
      }
    ],
    [ownerId, provideActionsCell, providePermissionsCell, provideStatusCell, t, userId]
  );

  return (
    <Table
      data={data}
      columns={columns}
      pagination={{ pageIndex, pageSize, totalPageCount, setPagination }}
      sorting={{
        columnsSorting: sorting,
        onSortingChange
      }}
    />
  );
}
