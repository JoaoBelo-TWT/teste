import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';

import { ConnectionsListCRMClient } from './client';
import { ConnectionsListCRMProps } from './types';

export function ConnectionsCRMList({ title, websiteData }: Readonly<ConnectionsListCRMProps>) {
  return (
    <ConnectionsListCRMClient
      title={title}
      websiteId={websiteData?.website.id}
      hubspotConnectionStatus={websiteData?.website.hubspotIntegrationStatus as HubspotIntegrationStatus}
      salesforceConnectionStatus={websiteData?.website.salesforceIntegrationStatus as SalesforceIntegrationStatus}
    />
  );
}
