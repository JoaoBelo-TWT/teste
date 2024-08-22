'use client';

import { Flex, Text } from '@mantine/core';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import { Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { IconButton } from '@/components/navigation/icon-button';
import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { Table } from '@/components/ui/table';
import { CONNECTIONS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { ConnectionStatus } from '@/types/connection';
import { buildUrlWithParams } from '@/utils/build-url';

import { ConnectButton } from '../button';
import { ExtendedColumnDef, ItemProps } from '../types';

import classes from './index.module.css';
import { ConnectionsListCRMClientProps } from './types';

export function ConnectionsListCRMClient({
  title,
  websiteId,
  hubspotConnectionStatus,
  salesforceConnectionStatus
}: Readonly<ConnectionsListCRMClientProps>) {
  const router = useRouter();
  const params = useParams<{ organizationId: string; dashboardId: string }>();
  const t = useTranslations();
  const [hubspotLoading, setHubspotLoading] = useState<boolean>(false);
  const [salesForceLoading, setSalesForceLoading] = useState<boolean>(false);

  const connections: ItemProps[] = useMemo(
    () => [
      {
        id: '1',
        title: t('onboarding.setup.step3.hubspot'),
        imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/hubspot.webp`,
        status: hubspotConnectionStatus,
        loading: hubspotLoading,
        disabled: salesforceConnectionStatus === SalesforceIntegrationStatus.Active,
        tooltip:
          salesforceConnectionStatus === SalesforceIntegrationStatus.Active
            ? t('onboarding.selectSource.crmList.tooltip')
            : undefined,
        onClick: () => {
          setHubspotLoading(true);
          const route = buildUrlWithParams({
            url: CONNECTIONS.HUBSPOT,
            params: {
              callbackUrl: window.location.href,
              websiteId
            }
          });
          if (route) router.push(route);
        }
      },
      {
        id: '2',
        title: t('onboarding.setup.step3.salesforce'),
        tooltip:
          hubspotConnectionStatus === HubspotIntegrationStatus.Active
            ? t('onboarding.selectSource.crmList.tooltip')
            : undefined,
        imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/salesforce.webp`,
        status: salesforceConnectionStatus,
        loading: salesForceLoading,
        disabled: hubspotConnectionStatus === HubspotIntegrationStatus.Active,
        onClick: () => {
          setSalesForceLoading(true);
          const route = buildUrlWithParams({
            url: CONNECTIONS.SALESFORCE,
            params: {
              callbackUrl: window.location.href,
              websiteId
            }
          });
          if (route) router.push(route);
        }
      }
    ],
    [t, websiteId, hubspotLoading, salesForceLoading, router, hubspotConnectionStatus, salesforceConnectionStatus]
  );

  const provideConnectionName = useCallback(
    (row: Row<ItemProps>) => (
      <AvatarWithLabel
        imageSrc={row.original.imageSrc}
        label={
          <Flex direction="column" gap={SPACING.xxs}>
            <Text fz="body2" lh="body2">
              {row.original.title}
            </Text>
            {row.original.status !== ConnectionStatus.Active && (
              <Text fz="body2" lh="body2" c="dark.5">
                {t('onboarding.selectSource.crmList.connect')}
              </Text>
            )}
          </Flex>
        }
      />
    ),
    [t]
  );

  const provideConnectButton = useCallback(
    (row: Row<ItemProps>) => (
      <Flex justify="end">
        {row.original.status !== ConnectionStatus.Active ? (
          <ConnectButton ml="auto" connection={row.original} />
        ) : (
          <Link
            href={routes.dashboard.dashboardCreate.allSet.path(params.organizationId, websiteId, params.dashboardId)}
          >
            <IconButton color="var(--mantine-color-dark-9)" variant="light" size={32} radius={100}>
              <CaretRight size={16} />
            </IconButton>
          </Link>
        )}
      </Flex>
    ),
    [params.dashboardId, params.organizationId, websiteId]
  );

  const columns: ExtendedColumnDef<ItemProps>[] = useMemo(
    () => [
      {
        accessorKey: 'connection',
        enableSorting: false,
        header: t('website.connections.table.headers.connectionName'),
        cell: ({ row }) => provideConnectionName(row)
      },
      {
        accessorKey: 'connectButton',
        enableSorting: false,
        hideHeader: true,
        cell: ({ row }) => provideConnectButton(row)
      }
    ],
    [provideConnectButton, provideConnectionName, t]
  );

  return (
    <div className={classes.crm}>
      {title && (
        <div className={classes.crm__header}>
          <Text tt="uppercase" c="dark.7" fz="caption2">
            {title}
          </Text>
        </div>
      )}
      <Table noHeader data={connections} columns={columns} />
    </div>
  );
}
