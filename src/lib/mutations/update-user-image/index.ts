'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UploadUserImageInput, UploadUserImageMutation } from '@/__generated__/graphql';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

import { deleteUserImage } from './delete';
import { uploadUserImage } from './upload';

export async function updateUserImage(
  input: Pick<UploadUserImageInput, 'userId' | 'imageBase64'>
): Promise<ServerActionResponse<UploadUserImageMutation | null | undefined>> {
  const t = await getTranslations();

  try {
    if (!input.imageBase64) {
      await deleteUserImage(input.userId);
      revalidateTag(nextCacheTags.meQuery);
      return {
        successMessage: t('actions.deleteUserImage.successMessage')
      };
    }

    const data = await uploadUserImage(input.userId, input.imageBase64);
    revalidateTag(nextCacheTags.meQuery);

    return {
      data,
      successMessage: t('actions.uploadUserImage.successMessage')
    };
  } catch (error) {
    return {
      errorMessage: input.imageBase64
        ? t('actions.uploadUserImage.errorMessage')
        : t('actions.deleteUserImage.errorMessage')
    };
  }
}
