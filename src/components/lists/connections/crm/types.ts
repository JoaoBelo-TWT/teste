import { GetWebsiteQuery, HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';

import { NavParams } from '../types';

export type ConnectionsListCRMProps = {
  title?: string;
  websiteData: GetWebsiteQuery;
};

export type ConnectionsListCRMClientProps = {
  title?: string;
  hubspotConnectionStatus: HubspotIntegrationStatus;
  salesforceConnectionStatus: SalesforceIntegrationStatus;
} & NavParams;
