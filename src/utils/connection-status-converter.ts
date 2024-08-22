import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { ConnectionStatus } from '@/types/connection';

export function convertToConnectionStatus(
  status?: SalesforceIntegrationStatus | HubspotIntegrationStatus | null
): ConnectionStatus {
  switch (status) {
    case SalesforceIntegrationStatus.Active:
    case HubspotIntegrationStatus.Active:
      return ConnectionStatus.Active;
    case SalesforceIntegrationStatus.Disabled:
    case HubspotIntegrationStatus.Disabled:
      return ConnectionStatus.Disabled;
    case SalesforceIntegrationStatus.OutOfSync:
    case HubspotIntegrationStatus.OutOfSync:
      return ConnectionStatus.OutOfSync;
    default:
      return ConnectionStatus.Disabled;
  }
}
