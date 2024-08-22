import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';

import { ModalError } from '../error';
import { ModalButtons } from '../modal-buttons';

export interface FunnelDeleteModalProps {
  removeIndex?: () => void;
  submitChanges?: () => void;
  stageName?: string;
}

export function FunnelDeleteModal() {
  const t = useTranslations();
  const { destroyModal, data } = useModal<FunnelDeleteModalProps>();

  if (!data?.removeIndex || !data?.submitChanges || !data?.stageName) return <ModalError />;

  const handleClick = () => {
    if (data.removeIndex) data.removeIndex();
    if (data.submitChanges) data.submitChanges();
    destroyModal();
  };

  return (
    <>
      <ModalHeader title={t('modals.deleteFunnelStage.title', { stageName: data.stageName })} />
      <Text mb={SPACING.xs}>{t('modals.deleteFunnelStage.description', { stageName: data.stageName })}</Text>
      <Text>{t('common.cantBeUndone')}</Text>
      <ModalButtons
        buttons={[
          {
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel')
          },
          {
            onClick: handleClick,
            children: t('common.delete')
          }
        ]}
      />
    </>
  );
}
