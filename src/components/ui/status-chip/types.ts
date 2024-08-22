import {
  GoogleAdsIntegrationStatus,
  HubspotIntegrationStatus,
  MetaAdsIntegrationStatus,
  SalesforceIntegrationStatus
} from '@/__generated__/graphql';
import { ConnectionStatus } from '@/types/connection';

export interface StatusChipProps {
  label?: string;
  status?:
    | ConnectionStatus
    | HubspotIntegrationStatus
    | SalesforceIntegrationStatus
    | GoogleAdsIntegrationStatus
    | MetaAdsIntegrationStatus
    | null;
  variant?: 'default' | 'borderless';
  loading?: boolean;
}
