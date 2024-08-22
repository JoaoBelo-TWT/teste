import { Flex } from '@mantine/core';

import { BackButton } from '@/components/navigation/back-button';
import NavigationTabs from '@/components/navigation/tabs';
import TopBarWrapper from '@/components/wrappers/top-bar';
import { fetchFunnels } from '@/lib/fetch-funnels';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { SearchParams } from '../channel-performance/types';
import DashboardFilters from '../dashboard/@topbar/components/dashboard-filters';

export default async function DeepDiveLayout({
  params,
  searchParams,
  children
}: Readonly<{
  children: React.ReactNode;
  searchParams: SearchParams;
  params: { organizationId: string; websiteId: string; dashboardId: string };
}>) {
  const timeFrame = searchParams?.timeframe;
  const dashboardFunnels = await fetchFunnels(params.dashboardId, timeFrame);

  const tabs = dashboardFunnels?.dashboardCustomerJourney.journeys.map((item) => ({
    label: item.name,
    href: routes.dashboard.funnelPerformance.path(
      params.organizationId,
      params.websiteId,
      params.dashboardId,
      `${item.id}`,
      timeFrame
    )
  }));

  return (
    <>
      <TopBarWrapper startContent={<BackButton />} endContent={<DashboardFilters />}>
        {tabs && (
          <NavigationTabs
            // eslint-disable-next-line i18next/no-literal-string
            preserveQueryParams={['timeframe']}
            tabs={tabs}
          />
        )}
      </TopBarWrapper>
      <Flex w="100%" mt={SPACING.xxxl} direction="column">
        {children}
      </Flex>
    </>
  );
}
