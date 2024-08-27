// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { CreateExpenseInput, CreateExpenseMutation } from '@/__generated__/graphql';
import { createExpenseMutation } from '@/lib/apollo/mutation/create-expense';
import { graphQLClient } from '@/lib/graphql/client';

import { dashboardKeys } from '../keys';

function run(params: CreateExpenseInput) {
  return graphQLClient.request(createExpenseMutation, { createExpenseInput: params });
}

export function useMutationCreateExpense(
  options?: UseMutationOptions<CreateExpenseMutation, Error, CreateExpenseInput>
) {
  const queryClient = useQueryClient();
  return useMutation<CreateExpenseMutation, Error, CreateExpenseInput>({
    mutationFn: (params: CreateExpenseInput) => run(params),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      options?.onSuccess?.(data, variables, context);
    },
    ...options
  });
}
