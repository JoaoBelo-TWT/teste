'use server';

import { FetchResult } from '@apollo/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import { MutationUpdateBudgetGoalArgs, UpdateBudgetGoalInput } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { updateBudgetGoalMutation } from '@/lib/apollo/mutation/update-budget-goal';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { RevalidatePath } from '@/types/enums/revalidate-paths';

export async function UpdateBudgetGoal({
  dashboardId,
  currency,
  recurring,
  recurringRepeat,
  value,
  id
}: UpdateBudgetGoalInput): Promise<FetchResult<MutationUpdateBudgetGoalArgs>> {
  const result = await getClient().mutate<MutationUpdateBudgetGoalArgs>({
    mutation: updateBudgetGoalMutation,
    variables: {
      updateBudgetGoalInput: {
        recurring,
        currency,
        dashboardId,
        id,
        recurringRepeat,
        value
      }
    }
  });

  revalidateTag(nextCacheTags.onboarding.goalsQuery);
  revalidatePath(RevalidatePath.ONBOARDING_GOALS, 'page');

  return result;
}
