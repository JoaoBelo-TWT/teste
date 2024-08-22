'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UploadWebsiteImageInput, UploadWebsiteImageMutation } from '@/__generated__/graphql';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

import { deleteWebsiteImage } from './delete';
import { uploadWebsiteImage } from './upload';

export async function updateWebsiteImage(
  input: Pick<UploadWebsiteImageInput, 'websiteId' | 'imageBase64'>
): Promise<ServerActionResponse<UploadWebsiteImageMutation | null | undefined>> {
  const t = await getTranslations();

  try {
    if (!input.imageBase64) {
      await deleteWebsiteImage(input.websiteId);
      revalidateTag(nextCacheTags.websiteQuery);
      return {
        successMessage: t('actions.deleteWebsiteImage.successMessage')
      };
    }

    const data = await uploadWebsiteImage(input.websiteId, input.imageBase64);
    revalidateTag(nextCacheTags.websiteQuery);

    return {
      data,
      successMessage: t('actions.uploadWebsiteImage.successMessage')
    };
  } catch (error) {
    return {
      errorMessage: input.imageBase64
        ? t('actions.uploadWebsiteImage.errorMessage')
        : t('actions.deleteWebsiteImage.errorMessage')
    };
  }
}
