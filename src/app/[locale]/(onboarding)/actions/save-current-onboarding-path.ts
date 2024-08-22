'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { SetCurrentOnboardingPathMutation, SetCurrentOnboardingPathMutationVariables } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { setCurrentOnboardingPathMutation } from '@/lib/apollo/mutation/set-current-onboarding-path';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function saveCurrentOnboardingPath(
  path: SetCurrentOnboardingPathMutationVariables['currentOnboardingPath']
): Promise<ServerActionResponse<SetCurrentOnboardingPathMutation | null | undefined>> {
  const t = await getTranslations('common');

  try {
    const { data } = await getClient().mutate({
      mutation: setCurrentOnboardingPathMutation,
      variables: {
        currentOnboardingPath: path
      }
    });

    revalidateTag(nextCacheTags.accounts.me);

    return {
      data,
      successMessage: t('success')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('error') };
  }
}
