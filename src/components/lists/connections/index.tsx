import {
  GoogleAdsIntegrationStatus,
  HubspotIntegrationStatus,
  MetaAdsIntegrationStatus,
  SalesforceIntegrationStatus
} from '@/__generated__/graphql';
import { getQueryConnectionStatus } from '@/lib/react-query/website/query-connection-status';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';
import { ConnectionStatus } from '@/types/connection';

import { ConnectionsListClient } from './client';
import { ConnectionsListProps } from './types';

export async function ConnectionsList({
  title,
  websiteId,
  organizationId,
  onboarding = true
}: Readonly<ConnectionsListProps>) {
  const { isWebsiteConnected } = await getQueryConnectionStatus(websiteId);
  const data = await getQueryWebsite(websiteId);

  return (
    <ConnectionsListClient
      title={title}
      organizationId={organizationId}
      websiteId={websiteId}
      onboarding={onboarding}
      websiteImage={data?.website.imageUrl}
      isSourceConnected={isWebsiteConnected ? ConnectionStatus.Active : ConnectionStatus.Disabled}
      hubspotConnectionStatus={data?.website.hubspotIntegrationStatus as HubspotIntegrationStatus}
      salesforceConnectionStatus={data?.website.salesforceIntegrationStatus as SalesforceIntegrationStatus}
      metaAdsConnectionStatus={data?.website.metaAdsIntegrationStatus as MetaAdsIntegrationStatus}
      googleAdsConnectionStatus={data?.website.googleAdsIntegrationStatus as GoogleAdsIntegrationStatus}
    />
  );
}
