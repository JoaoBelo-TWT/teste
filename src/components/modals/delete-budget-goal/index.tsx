import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { RemoveBudget } from '@/components/lists/goals-list/action';
import { ModalHeader } from '@/components/modals/modal-header';
import { toaster } from '@/components/ui/toast';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';

import { ModalError } from '../error';
import { ModalButtons } from '../modal-buttons';

export interface DeleteBudgetGoalProps {
  id?: string;
}

export function DeleteBudgetGoalModal() {
  const t = useTranslations();
  const { data, destroyModal } = useModal<DeleteBudgetGoalProps>();
  const [loading, setIsLoading] = useState<boolean>(false);

  if (!data?.id) return <ModalError />;

  const handleClick = async () => {
    if (data.id) {
      setIsLoading(true);
      const response = await RemoveBudget(data.id);

      if (response) {
        toaster.success({ title: t('actions.deleteBudgetGoal.successMessage') });
      } else {
        toaster.error({ title: t('actions.deleteBudgetGoal.errorMessage') });
      }
      setIsLoading(false);
    }

    destroyModal();
  };

  return (
    <>
      <ModalHeader title={t('modals.deleteBudgetGoal.title')} />
      <Text>{t('modals.deleteBudgetGoal.description')}</Text>
      <Text mb={SPACING.lg}>{t('common.cantBeUndone')}</Text>
      <ModalButtons
        buttons={[
          {
            disabled: loading,
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel')
          },
          {
            loading,
            variant: BUTTON_VARIANT.DANGER,
            onClick: handleClick,
            children: t('common.delete')
          }
        ]}
      />
    </>
  );
}
