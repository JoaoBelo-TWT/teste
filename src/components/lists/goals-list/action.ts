'use server';

import { revalidatePath } from 'next/cache';

import { getClient } from '@/lib/apollo/apollo-client';
import { removeActivityGoalMutation } from '@/lib/apollo/mutation/remove-activity-goal';
import { removeBudgetGoalMutation } from '@/lib/apollo/mutation/remove-budget-goal';
import { RevalidatePath } from '@/types/enums/revalidate-paths';

export async function RemoveBudget(id: string) {
  const response = await getClient().mutate({
    mutation: removeBudgetGoalMutation,
    variables: {
      id
    }
  });

  revalidatePath(RevalidatePath.ONBOARDING_GOALS, 'page');

  return response;
}

export async function RemoveActivity(id: string) {
  const response = await getClient().mutate({
    mutation: removeActivityGoalMutation,
    variables: {
      id
    }
  });

  revalidatePath(RevalidatePath.ONBOARDING_GOALS, 'page');

  return response;
}
