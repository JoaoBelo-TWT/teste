import { Flex, Skeleton } from '@mantine/core';
import { Suspense } from 'react';

import { BackButton } from '@/components/navigation/back-button';
import TopBarWrapper from '@/components/wrappers/top-bar';
import { fetchCampaigns } from '@/lib/fetch-campaigns';
import { SPACING } from '@/resources/constants';

import DashboardFilters from '../dashboard/topbar/components/dashboard-filters';

import CampaignTabsClient from './tabs-client';

export default async function CampaignsDeepDiveLayout({
  params,
  children
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string; websiteId: string; dashboardId: string };
}>) {
  const dashboardCampaignsData = await fetchCampaigns(params.dashboardId);

  if (!dashboardCampaignsData) return null;

  return (
    <>
      <TopBarWrapper startContent={<BackButton />} endContent={<DashboardFilters />}>
        <Suspense
          fallback={
            <Flex mih={80} align="center" gap={20} w={600}>
              <Skeleton height={30} w={395} />
              <Skeleton height={30} w={395} />
              <Skeleton height={30} w={395} />
            </Flex>
          }
        >
          <CampaignTabsClient campaignsServer={dashboardCampaignsData} params={params} />
        </Suspense>
      </TopBarWrapper>
      <Flex w="100%" mt={SPACING.xxxl} direction="column">
        {children}
      </Flex>
    </>
  );
}
