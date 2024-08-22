import { Box, Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { StageEventForm } from '@/components/forms/stage-event-form';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/ui/item-card';
import { Tabs } from '@/components/ui/tabs';
import { TextContent } from '@/components/ui/text-content';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { getClient } from '@/lib/apollo/apollo-client';
import { getStageQuery } from '@/lib/apollo/queries/onboarding-stage';
import { fetchMeData } from '@/lib/fetch-me-data';
import { SPACING } from '@/resources/constants';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { transformStageData } from '@/utils/formatters/funnel-stage-data';

import { StageTabPanelProps } from './types';

export async function StageTabPanel({
  name,
  currentStageId,
  nextStageId,
  dashboardId,
  flow
}: Readonly<StageTabPanelProps>) {
  const t = await getTranslations('onboarding');
  const user = await fetchMeData();
  const isOnboarding = !!user.me.currentOnboardingPath;
  const { data } = await getClient().query({
    query: getStageQuery,
    variables: {
      id: currentStageId
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.dashboardCreateCustomerFunnelStage + currentStageId]
        }
      }
    }
  });

  return (
    <Tabs.Panel value={currentStageId} mb={SPACING.lg}>
      <LeftRightWrapper
        leftContent={
          <Flex p={SPACING.md}>
            <TextContent title={t('stages.title', { name })} description={t('stages.description')} />
          </Flex>
        }
        rightContent={
          <Box p={SPACING.md}>
            <ItemCard
              w="100%"
              mb={SPACING.sm}
              itemImage={process.env.NEXT_PUBLIC_DEFAULT_IMG_URL}
              itemName={t('setup.step3.websiteTracking')}
              rightContent={
                <Button disabled variant="light" size="small">
                  {t('stages.changeSourceButton')}
                </Button>
              }
            />
            <StageEventForm
              data={transformStageData(data)}
              dashboardId={dashboardId}
              funnelStageId={currentStageId}
              nextStageId={nextStageId}
              flow={flow}
              isOnboarding={isOnboarding}
            />
          </Box>
        }
      />
    </Tabs.Panel>
  );
}
