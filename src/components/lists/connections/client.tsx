'use client';

import { Box, Flex, Text } from '@mantine/core';
import { Row } from '@tanstack/react-table';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import {
  GoogleAdsIntegrationStatus,
  HubspotIntegrationStatus,
  MetaAdsIntegrationStatus,
  SalesforceIntegrationStatus
} from '@/__generated__/graphql';
import { AvatarWithLabel } from '@/components/ui/avatar-label';
import { StatusChip } from '@/components/ui/status-chip';
import { Table } from '@/components/ui/table';
import { useModal } from '@/context/modal';
import { useEffectOnceWhen } from '@/hooks/use-effect-once';
import { useUrlParamsToToast } from '@/hooks/use-url-params-to-toast';
import { ADS, CONNECTIONS, MODALS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { ConnectionStatus } from '@/types/connection';
import { buildUrlWithParams } from '@/utils/build-url';

import { ConnectButton } from './button';
import classes from './index.module.css';
import { ConnectionsListClientProps, ExtendedColumnDef, ItemProps } from './types';

export function ConnectionsListClient({
  title,
  websiteId,
  organizationId,
  onboarding = true,
  websiteImage,
  isSourceConnected,
  hubspotConnectionStatus,
  salesforceConnectionStatus,
  metaAdsConnectionStatus,
  googleAdsConnectionStatus
}: Readonly<ConnectionsListClientProps>) {
  const router = useRouter();
  const t = useTranslations();
  const params = useSearchParams();
  const { setToast } = useUrlParamsToToast();
  const { setModal, setData } = useModal();
  const [websiteTrackingLoading, setWebsiteTrackingLoading] = useState<boolean>(false);
  const [googleAdsLoading, setGoogleAdsLoading] = useState<boolean>(false);
  const [hubspotLoading, setHubspotLoading] = useState<boolean>(false);
  const [metaAdsLoading, setMetaAdsLoading] = useState<boolean>(false);
  const [salesForceLoading, setSalesForceLoading] = useState<boolean>(false);

  useEffectOnceWhen(() => {
    const success = params.get('success');
    const error = params.get('error');

    setToast(success || undefined);
    setToast(error || undefined);
  }, true);

  const connections: ItemProps[] = useMemo(
    () => [
      {
        id: '0',
        title: t('onboarding.setup.step3.websiteTracking'),
        imageSrc: websiteImage ?? `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/source.webp`,
        category: t('website.connections.table.category.eventTracking'),
        status: isSourceConnected,
        loading: websiteTrackingLoading,
        onClick: () => {
          setWebsiteTrackingLoading(true);
          router.push(
            onboarding && organizationId
              ? routes.website.setup.config.path(organizationId, websiteId)
              : routes.website.connect.path(websiteId, organizationId)
          );
        }
      },
      {
        id: '1',
        title: t('onboarding.setup.step3.googleAds'),
        imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/google.webp`,
        category: t('website.connections.table.category.advertising'),
        status: googleAdsConnectionStatus,
        loading: googleAdsLoading,
        onClick: () => {
          setGoogleAdsLoading(true);
          const route =
            googleAdsConnectionStatus === GoogleAdsIntegrationStatus.Active
              ? ADS.GOOGLE
              : buildUrlWithParams({
                  url: CONNECTIONS.GOOGLE_ADS,
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
        title: t('onboarding.setup.step3.metaAds'),
        imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/meta.webp`,
        category: t('website.connections.table.category.advertising'),
        status: metaAdsConnectionStatus,
        loading: metaAdsLoading,
        onClick: () => {
          setMetaAdsLoading(true);
          const route =
            metaAdsConnectionStatus === MetaAdsIntegrationStatus.Active
              ? ADS.META
              : buildUrlWithParams({
                  url: CONNECTIONS.META_ADDS,
                  params: {
                    callbackUrl: window.location.href,
                    websiteId
                  }
                });
          if (route) router.push(route);
        }
      },
      {
        id: '3',
        title: t('onboarding.setup.step3.hubspot'),
        imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/hubspot.webp`,
        category: t('website.connections.table.category.crm'),
        status: hubspotConnectionStatus,
        tooltip:
          salesforceConnectionStatus === SalesforceIntegrationStatus.Active
            ? t('onboarding.selectSource.crmList.tooltip')
            : undefined,
        loading: hubspotLoading,
        disabled: salesforceConnectionStatus === SalesforceIntegrationStatus.Active,
        onClick: () => {
          const route = buildUrlWithParams({
            url: CONNECTIONS.HUBSPOT,
            params: {
              callbackUrl: window.location.href,
              websiteId
            }
          });
          if (isSourceConnected === ConnectionStatus.Active) {
            setData({ connection: t('onboarding.setup.step3.hubspot'), href: route });
            setModal(MODALS.CONNECT_CONFIRMATION);
          } else {
            setHubspotLoading(true);
            if (route) router.push(route);
          }
        }
      },
      {
        id: '4',
        title: t('onboarding.setup.step3.salesforce'),
        imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/salesforce.webp`,
        category: t('website.connections.table.category.crm'),
        status: salesforceConnectionStatus,
        tooltip:
          hubspotConnectionStatus === HubspotIntegrationStatus.Active
            ? t('onboarding.selectSource.crmList.tooltip')
            : undefined,
        loading: salesForceLoading,
        disabled: hubspotConnectionStatus === HubspotIntegrationStatus.Active,
        onClick: () => {
          const route = buildUrlWithParams({
            url: CONNECTIONS.SALESFORCE,
            params: {
              callbackUrl: window.location.href,
              websiteId
            }
          });
          if (isSourceConnected === ConnectionStatus.Active) {
            setData({ connection: t('onboarding.setup.step3.salesforce'), href: route });
            setModal(MODALS.CONNECT_CONFIRMATION);
          } else {
            setSalesForceLoading(true);
            if (route) router.push(route);
          }
        }
      }
    ],
    [
      googleAdsLoading,
      websiteTrackingLoading,
      hubspotLoading,
      salesForceLoading,
      metaAdsLoading,
      hubspotConnectionStatus,
      salesforceConnectionStatus,
      metaAdsConnectionStatus,
      googleAdsConnectionStatus,
      isSourceConnected,
      onboarding,
      organizationId,
      websiteId,
      router,
      websiteImage,
      setModal,
      setData,
      t
    ]
  );

  const getStatusText = useCallback(
    (
      status?:
        | ConnectionStatus
        | HubspotIntegrationStatus
        | SalesforceIntegrationStatus
        | MetaAdsIntegrationStatus
        | GoogleAdsIntegrationStatus
        | null
    ): string => {
      if (status) {
        return t(`website.connections.table.status.${status}`);
      }
      return t(`website.connections.table.status.DISABLED`);
    },
    [t]
  );

  const provideConnectionName = useCallback(
    (row: Row<ItemProps>) => (
      <AvatarWithLabel
        // eslint-disable-next-line i18next/no-literal-string
        avatarStyle={{ border: '1px solid var(--mantine-color-dark-3)' }}
        imageSrc={row.original.imageSrc}
        label={row.original.title}
      />
    ),
    []
  );

  const provideStatus = useCallback(
    (row: Row<ItemProps>) => (
      <StatusChip
        variant="borderless"
        status={row.original.status ?? ConnectionStatus.Disabled}
        label={getStatusText(row.original.status)}
        loading={row.original.loading}
      />
    ),
    [getStatusText]
  );

  const provideConnectButton = useCallback(
    (row: Row<ItemProps>) => (
      <Flex justify="end" align="right">
        {row.original.href || row.original.onClick ? (
          <ConnectButton ml="auto" connection={row.original} />
        ) : (
          <Box mr={SPACING.xs}>{t('common.comingSoon')}</Box>
        )}
      </Flex>
    ),
    [t]
  );
  const onboardColumns: ExtendedColumnDef<ItemProps>[] = useMemo(
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

  const columns: ExtendedColumnDef<ItemProps>[] = useMemo(
    () => [
      onboardColumns[0],
      {
        accessorKey: 'category',
        enableSorting: false,
        header: t('website.connections.table.headers.category'),
        cell: ({ row }) => row.original.category
      },
      {
        accessorKey: 'status',
        enableSorting: false,
        header: t('website.connections.table.headers.status'),
        cell: ({ row }) => provideStatus(row)
      },
      onboardColumns[1]
    ],
    [onboardColumns, provideStatus, t]
  );

  return (
    <div className={classes.connections}>
      <div className={classes.connections__header}>
        {title && (
          <Text tt="uppercase" c="dark.7" fz="caption2">
            {title}
          </Text>
        )}
      </div>
      <Table
        data={connections}
        columns={onboarding ? onboardColumns : columns}
        noHeader={onboarding}
        // hide column headers from column 4 and 5
        hiddenHeaderColIndex={[3, 4]}
      />
    </div>
  );
}
