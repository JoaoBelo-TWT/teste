'use server';

import { FetchResult } from '@apollo/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import { CreateBudgetGoalInput, CreateBudgetGoalMutationMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createBudgetGoalMutation } from '@/lib/apollo/mutation/create-budget-goal';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { RevalidatePath } from '@/types/enums/revalidate-paths';

export async function CreateBudgetGoal({
  dashboardId,
  currency,
  recurring,
  recurringRepeat,
  value
}: CreateBudgetGoalInput): Promise<FetchResult<CreateBudgetGoalMutationMutation>> {
  const result = await getClient().mutate<CreateBudgetGoalMutationMutation>({
    mutation: createBudgetGoalMutation,
    variables: {
      createBudgetGoalInput: {
        dashboardId,
        currency,
        recurring,
        recurringRepeat,
        value
      }
    }
  });

  revalidateTag(nextCacheTags.onboarding.goalsQuery);
  revalidatePath(RevalidatePath.ONBOARDING_GOALS, 'page');

  return result;
}
