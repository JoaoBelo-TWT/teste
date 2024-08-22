import { gql } from '@/__generated__';

export const updateWebsiteMutation = gql(`
mutation UpdateWebsite($updateWebsiteInput: UpdateWebsiteInput!) {
		updateWebsite(updateWebsiteInput: $updateWebsiteInput) {
		id,
		organizationId,
		name,
		domain,
		description
	}
}
`);
