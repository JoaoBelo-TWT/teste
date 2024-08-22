'use client';

import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useCallback, useState } from 'react';

import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { BaseCard } from '@/components/ui/base-card';
import { RoundFlag } from '@/components/ui/round-flag';
import { Table } from '@/components/ui/table';
import { useSetSearchParams } from '@/components/ui/table/useSetSearchParams';
import TruncateText from '@/components/ui/truncate-text';
import { SPACING } from '@/resources/constants';
import { splitByComma } from '@/utils/strings/split-by-coma';

import { DetailsTableEmpty } from '../details-table-empty';

import { DetailPage, DetailPageType, DetailsPageProps, ItemProps } from './types';

export function DetailsTable({ variant = DetailPage.DIRECT, pagination, data }: Readonly<DetailsPageProps>) {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(pagination);

  const t = useTranslations();

  const getTableTitle = useCallback((tableVariant: DetailPageType) => t(`website.detail.${tableVariant}`), [t]);

  /* eslint-disable i18next/no-literal-string */
  useSetSearchParams(pagination, pageIndex, pageSize, 'activity', null, null);

  const items = useMemo(
    () =>
      data?.channelPerformanceDeepDiveActivityDetails.activityDetails.map((item) => ({
        id: item.id,
        source: '',
        sourceImage: '',
        region: item.region || '',
        country: '',
        email: item.email || '',
        pageUrl: item.pageUrl || '',
        stage: item.customerFunnelStageName || '',
        searchTerm: item.searchTerm || ''
      })) || [],
    [data?.channelPerformanceDeepDiveActivityDetails]
  );

  const provideAvatar = useCallback(
    (imageSource: string, source: string) => (
      <AvatarWithLabel imageSrc={imageSource} label={source.length ? source : t('common.notApplicable')} />
    ),
    [t]
  );

  const provideRegion = useCallback(
    (region: string) => (
      <RoundFlag
        countryCode={splitByComma(region).length > 1 ? splitByComma(region)[1] : null}
        label={region !== '' ? region : t('common.notApplicable')}
      />
    ),
    [t]
  );
  const optionalColumns: ColumnDef<ItemProps>[] = useMemo(
    () => [
      {
        accessorKey: 'source',
        enableSorting: false,
        header: t('deepDives.table.columns.sourceUrl'),
        cell: ({ row }) => provideAvatar(row.original.sourceImage || '', row.original.source || '')
      },
      {
        accessorKey: 'pageUrl',
        enableSorting: false,
        header: t('website.activity.pageUrl'),
        cell: ({ row }) =>
          row.original.pageUrl ? <TruncateText maxSizePercentage={60} text={row.original.pageUrl} /> : null
      },
      {
        accessorKey: 'searchTerm',
        enableSorting: false,
        header: t('website.activity.searchTerm'),
        cell: ({ row }) => row.original.searchTerm || t('common.notApplicable')
      }
    ],
    [t, provideAvatar]
  );

  const columns: ColumnDef<ItemProps>[] = useMemo(() => {
    const columnsArray: ColumnDef<ItemProps>[] = [
      {
        accessorKey: 'region',
        enableSorting: false,
        header: t('website.activity.region'),
        cell: ({ row }) => provideRegion(row.original.region)
      },
      {
        accessorKey: 'email',
        enableSorting: false,
        header: t('website.activity.email'),
        cell: ({ row }) => row.original.email
      },
      {
        accessorKey: 'stage',
        enableSorting: false,
        header: t('website.activity.stage'),
        cell: ({ row }) => row.original.stage
      }
    ];

    if (variant !== DetailPage.DIRECT) {
      columnsArray.unshift(optionalColumns[0]);
    }

    if (variant !== DetailPage.SEARCH) {
      columnsArray.splice(1, 0, optionalColumns[1]);
    }

    if (variant === DetailPage.SEARCH) {
      columnsArray.splice(columnsArray.length - 1, 0, optionalColumns[2]);
    }

    return columnsArray;
  }, [t, optionalColumns, variant, provideRegion]);

  if (!data?.channelPerformanceDeepDiveActivityDetails.totalActivityDetails) {
    return <DetailsTableEmpty />;
  }
  return (
    <div id="activity-details-table">
      <BaseCard
        /* eslint-disable i18next/no-literal-string */
        paperProps={{ h: 'auto' }}
        headerProps={{
          title: getTableTitle(variant)
        }}
      >
        <Table
          boxProps={{ mt: SPACING.md }}
          data={items}
          columns={columns}
          pagination={{
            pageIndex,
            pageSize,
            totalPageCount: Math.ceil(
              (data?.channelPerformanceDeepDiveActivityDetails?.totalActivityDetails || 0) / pageSize
            ),
            setPagination
          }}
        />
      </BaseCard>
    </div>
  );
}
