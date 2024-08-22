import { gql } from '@/__generated__';

export const getWebsiteQuery = gql(`
  query GetWebsite($id: UUID!) {
    website(id: $id) {
      organizationId
      snippetUrl
      domain
      id
      id
      organizationId
      name
      domain
      description
      snippetUrl
      scriptUrl
      imageUrl
      pixelScriptGenerationStatus
      defaultDashboardId
      createdAt
      updatedAt    
      hubspotIntegrationStatus
      salesforceIntegrationStatus
      metaAdsIntegrationStatus
      googleAdsIntegrationStatus
      organization {
        name
      }
      user {
        firstName
        lastName
      }
    }
  }
`);
