import { gql } from '@/__generated__';

export const deleteOrganizationImageMutation = gql(`
    mutation DeleteOrganizationImage($deleteOrganizationImageInput: DeleteOrganizationImageInput!) {
        deleteOrganizationImage(deleteOrganizationImageInput: $deleteOrganizationImageInput) {
            id
        }
    }
`);
