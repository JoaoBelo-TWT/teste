import Link from 'next/link';
import { Suspense } from 'react';

import { StageEventSkeletonLoading } from '@/components/forms/stage-event-form/stage-events-skeleton-loading';
import { StageTabPanel } from '@/components/forms/stage-event-form/stage-tab-panel';
import { Tabs } from '@/components/ui/tabs';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { SPACING } from '@/resources/constants';
import { OnboardingQueryParamsProps } from '@/types/constants/onboarding-query-params';

export default async function CreateStageEventsPage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string; stageId: string };
  searchParams: OnboardingQueryParamsProps;
}>) {
  const { flow } = searchParams;
  const data = await fetchFunnelStages(params.dashboardId);

  return (
    <Tabs keepMounted={false} value={params.stageId}>
      <Tabs.List justify="flex-end" p={SPACING.md}>
        {data?.customerFunnelStages.edges.map(({ node: { id, name } }) => (
          <Link key={id} href={{ pathname: id }} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Tabs.Tab value={id}>{name}</Tabs.Tab>
          </Link>
        ))}
      </Tabs.List>

      <Suspense fallback={<StageEventSkeletonLoading />}>
        {data?.customerFunnelStages.edges.map((edge, index, array) => {
          const nextEdgeId = array[index + 1]?.node?.id;

          return (
            <StageTabPanel
              websiteId={params.websiteId}
              key={edge.node.id}
              name={edge.node.name}
              currentStageId={edge.node.id}
              dashboardId={params.dashboardId}
              nextStageId={nextEdgeId}
              flow={flow}
            />
          );
        })}
      </Suspense>
    </Tabs>
  );
}
