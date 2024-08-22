import { gql } from '@/__generated__';

export const updateOrganizationMutation = gql(`
mutation updateOrganization($updateOrganizationInput: UpdateOrganizationInput!) {
		updateOrganization(updateOrganizationInput: $updateOrganizationInput) {
		id,
		userId,
		name
	}
}
`);
