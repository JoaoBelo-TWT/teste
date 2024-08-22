import { gql } from '@/__generated__';

export const createOrganizationMutation = gql(`
mutation CreateOrganization($createOrganizationInput: CreateOrganizationInput!) {
		createOrganization(createOrganizationInput: $createOrganizationInput) {
		id,
		userId,
		name
	}
}
`);
