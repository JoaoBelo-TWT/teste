import { gql } from '@/__generated__';

export const updateUserMutation = gql(`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    email
    firstName
    lastName
    companyRoleId
    createdAt
    updatedAt
  }
}
`);
