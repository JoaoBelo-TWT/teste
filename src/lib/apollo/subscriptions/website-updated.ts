import { gql } from '@/__generated__';

export const websiteUpdatedSubscription = gql(`
  subscription WebsiteUpdated(
    $websiteId: UUID!
  ) {
    websiteUpdated(websiteId: $websiteId) {
      id
      organizationId
      name
      domain
      description
      snippetUrl
      scriptUrl
      imageUrl
      pixelScriptGenerationStatus
      createdAt
      updatedAt
    }
  }
`);
