import {
  GoogleAdsIntegrationStatus,
  HubspotIntegrationStatus,
  MetaAdsIntegrationStatus,
  SalesforceIntegrationStatus
} from '@/__generated__/graphql';
import { fetchSourceConnectionStatus } from '@/lib/fetch-connection-status';
import { fetchWebsiteData } from '@/lib/fetch-website-data';
import { ConnectionStatus } from '@/types/connection';

import { ConnectionsListClient } from './client';
import { ConnectionsListProps } from './types';

export async function ConnectionsList({
  title,
  websiteId,
  organizationId,
  onboarding = true
}: Readonly<ConnectionsListProps>) {
  const isSourceConnected = await fetchSourceConnectionStatus(websiteId);
  const data = await fetchWebsiteData(websiteId);

  return (
    <ConnectionsListClient
      title={title}
      organizationId={organizationId}
      websiteId={websiteId}
      onboarding={onboarding}
      websiteImage={data?.website.imageUrl}
      isSourceConnected={isSourceConnected ? ConnectionStatus.Active : ConnectionStatus.Disabled}
      hubspotConnectionStatus={data?.website.hubspotIntegrationStatus as HubspotIntegrationStatus}
      salesforceConnectionStatus={data?.website.salesforceIntegrationStatus as SalesforceIntegrationStatus}
      metaAdsConnectionStatus={data?.website.metaAdsIntegrationStatus as MetaAdsIntegrationStatus}
      googleAdsConnectionStatus={data?.website.googleAdsIntegrationStatus as GoogleAdsIntegrationStatus}
    />
  );
}
