import { ButtonProps } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';

import {
  GoogleAdsIntegrationStatus,
  HubspotIntegrationStatus,
  MetaAdsIntegrationStatus,
  SalesforceIntegrationStatus
} from '@/__generated__/graphql';
import { ConnectionStatus } from '@/types/connection';

export type NavParams = {
  websiteId: string;
  organizationId?: string | null;
  dashboardId?: string | null;
};

export type ItemProps = {
  id: string;
  category?: string;
  title: string;
  imageSrc: string;
  status?:
    | ConnectionStatus
    | HubspotIntegrationStatus
    | SalesforceIntegrationStatus
    | MetaAdsIntegrationStatus
    | GoogleAdsIntegrationStatus
    | null;
  href?: string | null;
  loading?: boolean;
  onClick?: () => void;
  hideHeader?: boolean;
  disabled?: boolean;
  tooltip?: string;
};

export type ExtendedColumnDef<T> = ColumnDef<T> & {
  hideHeader?: boolean;
};

export type ConnectionsListProps = {
  title?: string;
  onboarding?: boolean;
  variant?: 'default' | 'compact';
} & NavParams;

export type ConnectionsListClientProps = {
  title?: string;
  onboarding?: boolean;
  variant?: 'default' | 'compact';
  websiteImage?: string;
  isSourceConnected: ConnectionStatus;
  hubspotConnectionStatus: HubspotIntegrationStatus;
  salesforceConnectionStatus: SalesforceIntegrationStatus;
  metaAdsConnectionStatus: MetaAdsIntegrationStatus;
  googleAdsConnectionStatus: GoogleAdsIntegrationStatus;
} & NavParams;

export type ConnectButtonProps = {
  connection: ItemProps;
} & ButtonProps;
