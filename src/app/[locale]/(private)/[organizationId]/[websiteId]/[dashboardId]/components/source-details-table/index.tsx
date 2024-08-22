'use client';

import { ColumnDef, PaginationState } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useMemo, useCallback, useState } from 'react';

import { FunnelPerformanceConversionDetails } from '@/__generated__/graphql';
import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { Table } from '@/components/ui/table';
import { SPACING } from '@/resources/constants';

import { mockData } from '../../funnel-performance/[funnelId]/detail/mock';

import { ItemProps } from './types';

export function SourceDetailsTable({
  data,
  pagination
}: {
  data: FunnelPerformanceConversionDetails;
  pagination: PaginationState;
}) {
  const t = useTranslations();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(pagination);

  const provideAvatar = useCallback(
    (imageSource: string, source: string) => (
      <AvatarWithLabel imageSrc={imageSource} label={source || t('common.notApplicable')} />
    ),
    [t]
  );

  const tableData: ItemProps[] = useMemo(
    () =>
      data.funnelPerformanceConversionEvents.map((value, index) => ({
        id: String(index),
        region: value.region,
        email: value.email,
        firstPageVisited: value.firstPageVisited,
        searchTerm: value.searchTerm,
        date: value.timestamp,
        channel: value.channel
      })) as ItemProps[],
    [data]
  );

  const columns: ColumnDef<ItemProps>[] = useMemo(
    () => [
      {
        accessorKey: 'source',
        enableSorting: false,
        header: t('deepDives.table.columns.region'),
        cell: ({ row }) => provideAvatar(row.original.regionImage || '', row.original.region || '')
      },
      {
        accessorKey: 'email',
        enableSorting: false,
        header: t('deepDives.table.columns.email'),
        cell: ({ row }) => row.original.email
      },
      {
        accessorKey: 'firstPageUrl',
        enableSorting: false,
        header: t('deepDives.table.columns.firstPage'),
        cell: ({ row }) => row.original.firstPageVisited
      },
      {
        accessorKey: 'searchTerm',
        enableSorting: false,
        header: t('deepDives.table.columns.searchTerm'),
        cell: ({ row }) => row.original.searchTerm || t('common.notApplicable')
      },
      {
        accessorKey: 'type',
        enableSorting: false,
        header: t('deepDives.table.columns.type'),
        cell: ({ row }) => row.original.channel
      },
      {
        accessorKey: 'date',
        enableSorting: false,
        header: t('deepDives.table.columns.date'),
        cell: ({ row }) => dayjs(row.original.date).format('DD-MM-YYYY HH:mm')
      }
    ],
    [t, provideAvatar]
  );

  return (
    <Table
      boxProps={{ mt: SPACING.md }}
      data={tableData.length ? tableData : mockData}
      showEmpty={tableData.length === 0}
      columns={columns}
      pagination={{
        pageIndex,
        pageSize,
        totalPageCount: Math.ceil((data?.totalFunnelPerformanceConversionEvents || 0) / pageSize),
        setPagination
      }}
    />
  );
}
