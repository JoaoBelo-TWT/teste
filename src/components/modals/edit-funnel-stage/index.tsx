import { useQuery } from '@apollo/client';
import { Skeleton, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { StageEventForm } from '@/components/forms/stage-event-form';
import { ModalHeader } from '@/components/modals/modal-header';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/ui/item-card';
import { useModal } from '@/context/modal';
import { getStageQuery } from '@/lib/apollo/queries/onboarding-stage';
import {  SPACING } from '@/resources/constants';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { transformStageData } from '@/utils/formatters/funnel-stage-data';

import { ModalError } from '../error';

export interface FunnelStageEditModalProps {
  sourceData?: { name: string; img: string };
  eventData?: { name: string; id: string };
}

export function FunnelStageEditModal() {
  const t = useTranslations();
  const { data } = useModal<FunnelStageEditModalProps>();

  const stageId = data?.eventData?.id ?? '';

  const {
    error,
    data: stageData
  } = useQuery(getStageQuery, {
    variables: { id: stageId },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.dashboardCreateCustomerFunnelStage + stageId]
        }
      }
    }
  });

  if (!data.sourceData || !data.eventData || error) return <ModalError />;

  return (
    <>
      <ModalHeader title={t('modals.editFunnelStage.title', { stageName: data.eventData.name })} />
      <Text mb={SPACING.md}>{t('modals.editFunnelStage.description', { stageName: data.eventData.name })}</Text>
      <ItemCard
        mb={SPACING.md}
        itemImage={data.sourceData.img}
        itemName={data.sourceData.name}
        rightContent={
          <Button disabled variant="light" size="small">
            {t('onboarding.stages.changeSourceButton')}
          </Button>
        }
      />
      {stageData ? (
        <StageEventForm
          data={transformStageData(stageData)}
          funnelStageId={stageId}
          isOnboarding={false}
          isOnEditModal
          hideSubmitButton
        />
      ) : (
        <Skeleton w="100%" mih={397} mb={SPACING.md} />
      )}
    </>
  );
}
