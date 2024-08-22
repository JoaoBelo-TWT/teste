import { gql } from '@/__generated__';

export const getMeQuery = gql(`
query GetMe {
  me {
		id
		email
		firstName
		lastName
		companyRoleId
		companyIndustryId
		companySizeId
		defaultOrganizationId
		currentOnboardingPath
		createdAt
		updatedAt
		permissions {
			organizationId
			accessLevel
			dashboardId
			websiteId
		}
		imageUrl
  }
}
`);
