import { gql } from '@/__generated__';

export const removePermissionsMutation = gql(`
    mutation RemovePermissions($removePermissionId: UUID!) {
        removePermission(id: $removePermissionId)
    }
`);
