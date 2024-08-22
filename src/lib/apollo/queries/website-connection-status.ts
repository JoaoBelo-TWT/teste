import { gql } from '@/__generated__';

export const getSourceConnectionStatusQuery = gql(`
  query IsWebsiteConnected($websiteId: UUID!) {
    isWebsiteConnected(websiteId: $websiteId)
  }
`);
