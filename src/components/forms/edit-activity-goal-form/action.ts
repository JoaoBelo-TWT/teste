'use server';

import { FetchResult } from '@apollo/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import { MutationUpdateActivityGoalArgs, UpdateActivityGoalInput } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { updateActivityGoalMutation } from '@/lib/apollo/mutation/update-activity-goal';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { RevalidatePath } from '@/types/enums/revalidate-paths';

export async function UpdateActivityGoal(
  updateActivityGoalInput: UpdateActivityGoalInput
): Promise<FetchResult<MutationUpdateActivityGoalArgs>> {
  const result = await getClient().mutate<MutationUpdateActivityGoalArgs>({
    mutation: updateActivityGoalMutation,
    variables: {
      updateActivityGoalInput
    }
  });

  revalidateTag(nextCacheTags.onboarding.goalsQuery);
  revalidatePath(RevalidatePath.ONBOARDING_GOALS, 'page');

  return result;
}
