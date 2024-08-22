import { Box } from '@mantine/core';

import { FunnelStagesList } from '@/components/lists/funnel-stages-list';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { fetchMeData } from '@/lib/fetch-me-data';
import { SPACING } from '@/resources/constants';
import { OnboardingQueryParamsProps } from '@/types/constants/onboarding-query-params';

import CreateStatesContent from '../../components/left-content';

export default async function CreateStagesPage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string };
  searchParams: OnboardingQueryParamsProps;
}>) {
  const { flow } = searchParams;
  const data = await fetchFunnelStages(params.dashboardId);
  const user = await fetchMeData();

  return (
    <LeftRightWrapper
      leftContent={<CreateStatesContent />}
      rightContent={
        <Box p={SPACING.md}>
          <FunnelStagesList
            isOnboarding={!!user.me.currentOnboardingPath}
            funnelStages={data}
            flow={flow}
            organizationId={params.organizationId}
            websiteId={params.websiteId}
            dashboardId={params.dashboardId}
          />
        </Box>
      }
    />
  );
}
