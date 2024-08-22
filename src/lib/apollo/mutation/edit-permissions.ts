import { gql } from '@/__generated__';

export const editPermissionsMutation = gql(`
mutation UpdatePermission($updatePermissionInput: UpdatePermissionInput!) {
  updatePermission(updatePermissionInput: $updatePermissionInput) {
    id
  }
}
`);
