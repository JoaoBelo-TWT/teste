'use client';

import { ColumnDef, PaginationState } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useMemo, useCallback, useState } from 'react';

import { FunnelPerformanceConversionDetails } from '@/__generated__/graphql';
import { RoundFlag } from '@/components/ui/round-flag';
import { Table } from '@/components/ui/table';
import { DATE_FORMATS, SPACING } from '@/resources/constants';
import { splitByComma } from '@/utils/strings/split-by-coma';

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

  const provideRegion = useCallback(
    (region: string) => (
      <RoundFlag
        countryCode={splitByComma(region).length > 1 ? splitByComma(region)[1] : null}
        label={region ?? t('common.notApplicable')}
      />
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
        cell: ({ row }) => provideRegion(row.original.region)
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
        cell: ({ row }) => dayjs(row.original.date).format(DATE_FORMATS.FULL)
      }
    ],
    [t, provideRegion]
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
