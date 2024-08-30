// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { UpdateWebsiteInput, UpdateWebsiteMutation } from '@/__generated__/graphql';
import { updateWebsiteMutation } from '@/lib/apollo/mutation/update-website';
import { graphQLClient } from '@/lib/graphql/client';

import { websiteKeys } from '../keys';

function run(updateWebsiteInput: UpdateWebsiteInput) {
  return graphQLClient.request(updateWebsiteMutation, {
    updateWebsiteInput
  });
}

export function useMutationUpdateWebsite(
  websiteId: string,
  options?: UseMutationOptions<UpdateWebsiteMutation, Error, UpdateWebsiteInput>
) {
  const queryClient = useQueryClient();
  return useMutation<UpdateWebsiteMutation, Error, UpdateWebsiteInput>({
    ...options,
    mutationFn: (params: UpdateWebsiteInput) => run(params),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: websiteKeys.single(websiteId) });
      options?.onSuccess?.(data, variables, context);
    }
  });
}
