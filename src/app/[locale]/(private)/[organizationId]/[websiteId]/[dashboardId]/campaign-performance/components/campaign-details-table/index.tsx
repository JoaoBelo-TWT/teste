'use client';

import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useCallback, useState } from 'react';

import { CampaignPerformance } from '@/__generated__/graphql';
import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { Table } from '@/components/ui/table';
import { useSetSearchParams } from '@/components/ui/table/useSetSearchParams';
import TruncateText from '@/components/ui/truncate-text';
import { SPACING } from '@/resources/constants';

import { mockData } from '../../mock';

import classes from './index.module.css';
import { ItemProps } from './types';

export function CampaignDetailsTable({ data, pagination }: { data: CampaignPerformance; pagination: PaginationState }) {
  const t = useTranslations();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(pagination);
  useSetSearchParams(pagination, pageIndex, pageSize);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  // const subPaths = pathname.split('/');
  // const websiteId = subPaths[2];
  // const dashboardId = subPaths[3];
  // const campaignName = searchParams.get('campaignName');

  const provideAvatar = useCallback(
    (imageSource: string, source: string) => (
      // <Link
      //   style={{ textDecoration: 'none', color: 'inherit' }}
      // eslint-disable-next-line max-len
      //   href={routes.dashboard.campaignSourcePerformance.path(dashboardId, websiteId, dashboardId, campaignName, 'asd')}
      // >
      <AvatarWithLabel
        imageSrc={imageSource}
        label={<TruncateText text={source.length ? source : t('common.notApplicable')} />}
      />
      // </Link>
    ),
    // [dashboardId, websiteId, dashboardId, campaignName]
    [t]
  );

  const tableData: ItemProps[] = useMemo(
    () =>
      data.activity.map((value, index) => ({
        id: String(index),
        sourceUrl: value.sourceUrl,
        firstPageVisited: value.firstPageVisited,
        leadConversions: value.leadConversion,
        customerConversions: value.customerConversion
      })) as ItemProps[],
    [data]
  );

  const columns: ColumnDef<ItemProps>[] = useMemo(
    () => [
      {
        accessorKey: 'source',
        enableSorting: false,
        header: t('deepDives.table.columns.sourceUrl'),
        cell: ({ row }) => provideAvatar(row.original.sourceImage || '', row.original.sourceUrl || '')
      },
      {
        accessorKey: 'firstPageUrl',
        enableSorting: false,
        header: t('deepDives.table.columns.firstPage'),
        cell: ({ row }) =>
          row.original.firstPageVisited ? <TruncateText text={row.original.firstPageVisited} /> : undefined
      },
      {
        accessorKey: 'searchTerm',
        enableSorting: false,
        header: t('common.conversionsByName', { channel: data.cpl.label }),
        cell: ({ row }) => row.original.leadConversions
      },
      {
        accessorKey: 'searchTerm',
        enableSorting: false,
        header: t('common.conversionsByName', { channel: data.cpc.label }),
        cell: ({ row }) => row.original.customerConversions
      }
    ],
    [t, provideAvatar, data.cpc.label, data.cpl.label]
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
        totalPageCount: Math.ceil((data?.totalActivity || 0) / pageSize),
        setPagination
      }}
    />
  );
}
