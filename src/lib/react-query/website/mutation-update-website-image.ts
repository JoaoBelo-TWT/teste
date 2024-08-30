// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { UploadWebsiteImageInput, UploadWebsiteImageMutation } from '@/__generated__/graphql';
import { deleteWebsiteImageMutation } from '@/lib/apollo/mutation/delete-website-image';
import { uploadWebsiteImageMutation } from '@/lib/apollo/mutation/upload-website-image';
import { graphQLClient } from '@/lib/graphql/client';

import { websiteKeys } from '../keys';

type Props = Pick<UploadWebsiteImageInput, 'websiteId' | 'imageBase64'>;

async function run(props: Props) {
  if (!props.imageBase64) {
    await graphQLClient.request(deleteWebsiteImageMutation, {
      deleteWebsiteImageInput: { websiteId: props.websiteId }
    });
  }

  return graphQLClient.request(uploadWebsiteImageMutation, {
    uploadWebsiteImageInput: props
  });
}

export function useMutationUpdateWebsiteImage(
  websiteId?: string,
  options?: UseMutationOptions<UploadWebsiteImageMutation, Error, Props>
) {
  const queryClient = useQueryClient();
  return useMutation<UploadWebsiteImageMutation, Error, Props>({
    ...options,
    mutationFn: (params: Props) => run(params),
    onSuccess: async (data, variables, context) => {
      if (websiteId) {
        await queryClient.invalidateQueries({ queryKey: websiteKeys.single(websiteId) });
      }
      options?.onSuccess?.(data, variables, context);
    }
  });
}
