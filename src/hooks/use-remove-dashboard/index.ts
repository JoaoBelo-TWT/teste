import { useMutation } from '@apollo/client';
import { useTranslations } from 'next-intl';

import { removeDashboardMutation } from '@/lib/apollo/mutation/remove-dashboard';
import { captureError } from '@/utils/errors/capture-error';

export function useRemoveDashboard() {
  const t = useTranslations('common');

  const [removeDashboardMutationFunction] = useMutation(removeDashboardMutation);

  const removeDashboard = async (id: string) => {
    try {
      const { data } = await removeDashboardMutationFunction({
        variables: { dashboardId: id }
      });

      return {
        data,
        successMessage: t('success')
      };
    } catch (error) {
      captureError(error);
      return { errorMessage: t('error') };
    }
  };

  return removeDashboard;
}
