import { gql } from '@/__generated__';

export const createWebsiteMutation = gql(`
    mutation CreateWebsite($createWebsiteInput: CreateWebsiteInput!) {
        createWebsite(createWebsiteInput: $createWebsiteInput) {
            organizationId
		    name
		    domain
            id
        }
    }
`);
