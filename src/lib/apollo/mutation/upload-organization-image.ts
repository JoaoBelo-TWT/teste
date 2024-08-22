import { gql } from '@/__generated__';

export const uploadOrganizationImageMutation = gql(`
    mutation UploadOrganizationImage($uploadOrganizationImageInput: UploadOrganizationImageInput!) {
        uploadOrganizationImage(uploadOrganizationImageInput: $uploadOrganizationImageInput) {
            id,
            imageUrl
        }
    }
`);
