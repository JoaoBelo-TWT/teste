import { gql } from '@/__generated__';

export const getOrganizationQuery = gql(`
query GetOrganization($organizationId: UUID!) {
  organization(id: $organizationId) {
    id
    defaultWebsiteId
    companyIndustryId
    name
    companySizeId
    imageUrl
    user {
      firstName
      lastName
      id
      email
    }
  }
}
`);
