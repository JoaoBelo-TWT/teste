'use server';

import { FetchResult } from '@apollo/client';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { CreateActivityGoalMutationMutation, CreateExpenseInput } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createExpenseMutation } from '@/lib/apollo/mutation/create-expense';
import { RevalidatePath } from '@/types/enums/revalidate-paths';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function CreateExpense(
  createExpenseInput: CreateExpenseInput
): Promise<ServerActionResponse<FetchResult<CreateActivityGoalMutationMutation>>> {
  const t = await getTranslations('actions.createExpense');

  try {
    const result = await getClient().mutate<CreateActivityGoalMutationMutation>({
      mutation: createExpenseMutation,
      variables: {
        createExpenseInput
      }
    });

    revalidatePath(RevalidatePath.DASHBOARD_OVERVIEW, 'layout');

    return {
      data: result,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}
