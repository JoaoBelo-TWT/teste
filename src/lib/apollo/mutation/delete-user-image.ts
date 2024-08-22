import { gql } from '@/__generated__';

export const deleteUserImageMutation = gql(`
    mutation DeleteUserImage($deleteUserImageInput: DeleteUserImageInput!) {
        deleteUserImage(deleteUserImageInput: $deleteUserImageInput) {
            id
        }
    }
`);
