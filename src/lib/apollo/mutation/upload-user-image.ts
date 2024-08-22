import { gql } from '@/__generated__';

export const uploadUserImageMutation = gql(`
    mutation UploadUserImage($uploadUserImageInput: UploadUserImageInput!) {
        uploadUserImage(uploadUserImageInput: $uploadUserImageInput) {
            id,
            imageUrl
        }
    }
`);
