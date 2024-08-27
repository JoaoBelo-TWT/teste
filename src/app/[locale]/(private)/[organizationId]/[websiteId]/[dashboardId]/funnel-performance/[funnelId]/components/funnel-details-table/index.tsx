'use client';

import { Flex, Text } from '@mantine/core';
import { QuestionMark } from '@phosphor-icons/react/dist/ssr';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo, useCallback, useState } from 'react';

import { FunnelPerformanceDeepDive } from '@/__generated__/graphql';
import { Avatar } from '@/components/ui/avatar';
import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { Table } from '@/components/ui/table';
import { useSetSearchParams } from '@/components/ui/table/useSetSearchParams';
import TruncateText from '@/components/ui/truncate-text';
import { useNavigationStore } from '@/context/navigation/store';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { mockData } from '../../mock';

import classes from './index.module.css';
import { FunnelPerformanceRowData } from './types';

export function FunnelDetailsTable({
  params,
  data,
  pagination,
  funnelName
}: {
  params: { organizationId: string; websiteId: string; dashboardId: string; funnelId: string };
  data: FunnelPerformanceDeepDive;
  pagination: PaginationState;
  funnelName: string;
}) {
  const t = useTranslations();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(pagination);
  const { filters } = useNavigationStore();

  useSetSearchParams(pagination, pageIndex, pageSize);
  const provideAvatar = useCallback(
    (imageSource: string, source: string, firstPageVisited: string) => (
      <Link
        className={classes['funnel-details-table__link']}
        href={routes.dashboard.funnelSourcePerformance.path(
          params.organizationId,
          params.websiteId,
          params.dashboardId,
          params.funnelId,
          source,
          firstPageVisited,
          filters.timeframe
        )}
      >
        <AvatarWithLabel imageSrc={imageSource} label={<TruncateText text={source.length ? source : funnelName} />} />
      </Link>
    ),
    [params.dashboardId, params.organizationId, params.websiteId, params.funnelId, filters.timeframe, funnelName]
  );

  const tableData: FunnelPerformanceRowData[] = useMemo(
    () =>
      data.funnelPerformanceConversions.map((value, index) => ({
        id: String(index),
        conversions: value.conversions,
        firstPageVisited: value.firstPageVisited,
        sourceUrl: value.sourceUrl,
        urlSourceImage: value.urlSourceImage
      })) as FunnelPerformanceRowData[],
    [data]
  );
  const columns: ColumnDef<FunnelPerformanceRowData>[] = useMemo(
    () => [
      {
        accessorKey: 'sourceUrl',
        enableSorting: false,
        header: t('deepDives.table.columns.sourceUrl'),
        cell: ({ row }) => {
          if (!row.original.firstPageVisited) {
            return (
              <Flex align="center" gap={SPACING.xs}>
                <Avatar variant="outline" size={32}>
                  <QuestionMark size={16} />
                </Avatar>
                <Text fz="sm">{t('common.unknown')}</Text>
              </Flex>
            );
          }
          return provideAvatar(
            row.original.urlSourceImage || '',
            row.original.sourceUrl || '',
            row.original.firstPageVisited
          );
        }
      },
      {
        accessorKey: 'firstPageVisited',
        enableSorting: false,
        header: t('deepDives.table.columns.firstPage'),
        cell: ({ row }) =>
          row.original.firstPageVisited ? (
            <TruncateText text={row.original.firstPageVisited} />
          ) : (
            t('common.notApplicable')
          )
      },
      {
        accessorKey: 'conversions',
        enableSorting: false,
        header: t('common.conversions'),
        cell: ({ row }) => row.original.conversions
      }
    ],
    [t, provideAvatar]
  );

  return (
    <Table
      tableClassName={classes['funnel-details-table']}
      boxProps={{ mt: SPACING.md }}
      data={tableData.length ? tableData : mockData}
      showEmpty={tableData.length === 0}
      columns={columns}
      pagination={{
        pageIndex,
        pageSize,
        totalPageCount: Math.ceil((data?.totalFunnelPerformanceConversions || 0) / pageSize),
        setPagination
      }}
    />
  );
}
