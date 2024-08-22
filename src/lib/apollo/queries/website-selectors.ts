import { gql } from '@/__generated__';

export const getWebsiteSelectors = gql(`
  query Selectors($websiteId: String!) {
    selectors(websiteId: $websiteId) {
      createdAt
      id
      link
      querySelector
      updatedAt
      websiteId
    }
  }
`);
