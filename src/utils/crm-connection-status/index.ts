import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';

export async function isConnectedToCRM(websiteId: string) {
  if (!websiteId) return false;

  const websiteData = await getQueryWebsite(websiteId);
  const connectedToCRM =
    websiteData?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active ||
    websiteData?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active;

  return connectedToCRM;
}
