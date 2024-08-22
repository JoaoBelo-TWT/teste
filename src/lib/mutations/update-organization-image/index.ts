'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UploadOrganizationImageInput, UploadOrganizationImageMutation } from '@/__generated__/graphql';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

import { deleteOrganizationImage } from './delete';
import { uploadOrganizationImage } from './upload';

export async function updateOrganizationImage(
  input: Pick<UploadOrganizationImageInput, 'organizationId' | 'imageBase64'>
): Promise<ServerActionResponse<UploadOrganizationImageMutation | null | undefined>> {
  const t = await getTranslations();

  try {
    if (!input.imageBase64) {
      await deleteOrganizationImage(input.organizationId);
      revalidateTag(nextCacheTags.websiteQuery);
      return {
        successMessage: t('actions.deleteOrganizationImage.successMessage')
      };
    }

    const data = await uploadOrganizationImage(input.organizationId, input.imageBase64);
    revalidateTag(nextCacheTags.websiteQuery);

    return {
      data,
      successMessage: t('actions.uploadOrganizationImage.successMessage')
    };
  } catch (error) {
    return {
      errorMessage: input.imageBase64
        ? t('actions.uploadOrganizationImage.errorMessage')
        : t('actions.deleteOrganizationImage.errorMessage')
    };
  }
}
