'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { CreateActivityGoalInput, CreateActivityGoalMutationMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createActivityGoalMutation } from '@/lib/apollo/mutation/create-activity-goal';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function CreateActivityGoal(
  createActivityGoalInput: CreateActivityGoalInput
): Promise<ServerActionResponse<CreateActivityGoalMutationMutation | null | undefined>> {
  const t = await getTranslations();

  try {
    const { data } = await getClient().mutate({
      mutation: createActivityGoalMutation,
      variables: {
        createActivityGoalInput
      }
    });

    revalidateTag(nextCacheTags.onboarding.goalsQuery);

    return {
      data,
      successMessage: t('common.success')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('common.error') };
  }
}
