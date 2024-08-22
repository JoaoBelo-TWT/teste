import { gql } from '@/__generated__';

export const createPermissionsMutation = gql(`
mutation CreatePermission($createPermissionInput: CreatePermissionInput!) {
  createPermission(createPermissionInput: $createPermissionInput) {
    id
  }
}
`);
