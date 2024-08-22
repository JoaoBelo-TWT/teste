import { gql } from '@/__generated__';

export const getHubspotConnectionStatusQuery = gql(`
  query IsHubspotConnected($websiteId: UUID!) {
    isHubspotConnected(websiteId: $websiteId)
  }
`);
