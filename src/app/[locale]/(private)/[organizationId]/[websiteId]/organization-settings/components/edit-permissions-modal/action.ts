'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UpdatePermissionInput, UpdatePermissionMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { editPermissionsMutation } from '@/lib/apollo/mutation/edit-permissions';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

export async function editPermission(
  updatePermissionInput: UpdatePermissionInput
): Promise<ServerActionResponse<UpdatePermissionMutation | null>> {
  const t = await getTranslations('actions.editPermissions');
  try {
    const { data } = await getClient().mutate({
      mutation: editPermissionsMutation,
      variables: {
        updatePermissionInput
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
