// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { UpdateDashboardInput, UpdateDashboardMutation } from '@/__generated__/graphql';
import { updateDashboardMutation } from '@/lib/apollo/mutation/update-dashboard';
import { graphQLClient } from '@/lib/graphql/client';

import { dashboardKeys } from '../keys';

function run(updateDashboardInput: UpdateDashboardInput) {
  return graphQLClient.request(updateDashboardMutation, {
    updateDashboardInput
  });
}

export function useMutationUpdateDashboard(
  dashboardId: string,
  options?: UseMutationOptions<UpdateDashboardMutation, Error, UpdateDashboardInput>
) {
  const queryClient = useQueryClient();
  return useMutation<UpdateDashboardMutation, Error, UpdateDashboardInput>({
    ...options,
    mutationFn: (params: UpdateDashboardInput) => run(params),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.single(dashboardId) });
      options?.onSuccess?.(data, variables, context);
    }
  });
}
