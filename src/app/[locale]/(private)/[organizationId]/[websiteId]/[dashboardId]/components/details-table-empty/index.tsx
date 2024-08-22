'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { BaseCard } from '@/components/ui/base-card';
import { RoundFlag } from '@/components/ui/round-flag';
import { Table } from '@/components/ui/table';
import { SPACING } from '@/resources/constants';
import { splitByComma } from '@/utils/strings/split-by-coma';

import { tableData } from './mock';
import { DetailPageType, ItemProps } from './types';

export function DetailsTableEmpty() {
  const t = useTranslations();

  const getTableTitle = useCallback((tableVariant: DetailPageType) => t(`website.detail.${tableVariant}`), [t]);

  const provideAvatar = useCallback(
    (imageSource: string, source: string) => <AvatarWithLabel imageSrc={imageSource} label={source} />,
    []
  );

  const provideRegion = useCallback(
    (region: string) => (
      <RoundFlag
        countryCode={splitByComma(region).length > 1 ? splitByComma(region)[1] : null}
        label={splitByComma(region).length > 0 ? splitByComma(region)[0] : t('common.notApplicable')}
      />
    ),
    [t]
  );

  const columns: ColumnDef<ItemProps>[] = useMemo(() => {
    const columnsArray: ColumnDef<ItemProps>[] = [
      {
        accessorKey: 'source',
        enableSorting: false,
        header: t('deepDives.table.columns.sourceUrl'),
        cell: ({ row }) => provideAvatar(row.original.sourceImage || '', row.original.source || '')
      },
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
        accessorKey: 'searchTerm',
        enableSorting: false,
        header: t('website.activity.searchTerm'),
        cell: ({ row }) => row.original.searchTerm
      },
      {
        accessorKey: 'stage',
        enableSorting: false,
        header: t('website.activity.stage'),
        cell: ({ row }) => row.original.stage
      }
    ];

    return columnsArray;
  }, [t, provideAvatar, provideRegion]);

  return (
    <div id="activity-details-table">
      <BaseCard
        /* eslint-disable i18next/no-literal-string */
        paperProps={{ h: 'auto' }}
        headerProps={{
          /* eslint-disable i18next/no-literal-string */
          title: getTableTitle('direct')
        }}
      >
        <Table boxProps={{ mt: SPACING.md }} data={tableData} columns={columns} showEmpty />
      </BaseCard>
    </div>
  );
}
