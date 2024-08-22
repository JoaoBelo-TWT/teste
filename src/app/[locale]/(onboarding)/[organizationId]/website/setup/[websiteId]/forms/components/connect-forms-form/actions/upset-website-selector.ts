'use server';

import { FetchResult } from '@apollo/client';
import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import {
  UpdateOrganizationInput,
  UpdateOrganizationMutation,
  UpsertSelectorInput,
  UpsertSelectorMutation
} from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { updateOrganizationMutation } from '@/lib/apollo/mutation/update-organization';
import { upsertSelectorsMutation } from '@/lib/apollo/mutation/upsert-selector';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function UpsertSelector(
  upsertSelectorArrayInput: UpsertSelectorInput[]
): Promise<ServerActionResponse<FetchResult<UpsertSelectorMutation>>> {
  const t = await getTranslations('actions.upsertSelector');

  try {
    const data = await getClient().mutate<UpsertSelectorMutation>({
      mutation: upsertSelectorsMutation,
      variables: {
        upsertSelectorSelectors: upsertSelectorArrayInput
      }
    });

    revalidateTag(nextCacheTags.websiteSelectorsQuery);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}

export async function updateOrganization(
  updateOrganizationInput: UpdateOrganizationInput
): Promise<ServerActionResponse<FetchResult<UpdateOrganizationMutation>>> {
  const t = await getTranslations('actions.updateOrganization');

  try {
    const data = await getClient().mutate({
      mutation: updateOrganizationMutation,
      variables: {
        updateOrganizationInput
      }
    });

    revalidateTag(nextCacheTags.accounts.me);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}
