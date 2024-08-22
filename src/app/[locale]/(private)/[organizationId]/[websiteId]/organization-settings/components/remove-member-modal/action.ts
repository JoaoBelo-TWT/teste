'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { RemovePermissionsMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { removePermissionsMutation } from '@/lib/apollo/mutation/remove-permissions';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

export async function removePermission(
  permissionId: string
): Promise<ServerActionResponse<RemovePermissionsMutation | null>> {
  const t = await getTranslations('actions.removePermissions');
  try {
    const { data } = await getClient().mutate({
      mutation: removePermissionsMutation,
      variables: {
        removePermissionId: permissionId
      }
    });

    revalidateTag(nextCacheTags.permissionsQuery);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}
