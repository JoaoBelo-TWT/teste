import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { fetchWebsiteData } from '@/lib/fetch-website-data';

export async function isConnectedToCRM(websiteId: string) {
  if (!websiteId) return false;

  const websiteData = await fetchWebsiteData(websiteId);
  const connectedToCRM =
    websiteData?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active ||
    websiteData?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active;

  return connectedToCRM;
}
