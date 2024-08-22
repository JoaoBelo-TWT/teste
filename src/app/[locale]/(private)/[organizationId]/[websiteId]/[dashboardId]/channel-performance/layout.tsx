import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { BackButton } from '@/components/navigation/back-button';
import NavigationTabs from '@/components/navigation/tabs';
import TopBarWrapper from '@/components/wrappers/top-bar';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import DashboardFilters from '../dashboard/topbar/components/dashboard-filters';

export default async function DeepDiveLayout({
  params,
  children
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string; websiteId: string; dashboardId: string };
}>) {
  const t = await getTranslations();

  return (
    <>
      <TopBarWrapper startContent={<BackButton />} endContent={<DashboardFilters />}>
        <NavigationTabs
          // eslint-disable-next-line i18next/no-literal-string
          preserveQueryParams={['timeframe']}
          tabs={[
            {
              label: t('general.channels.search'),
              href: routes.dashboard.channelPerformance.search.path(
                params.organizationId,
                params.websiteId,
                params.dashboardId
              )
            },
            {
              label: t('general.channels.referrals'),
              href: routes.dashboard.channelPerformance.referrals.path(
                params.organizationId,
                params.websiteId,
                params.dashboardId
              )
            },
            {
              label: t('general.channels.social'),
              href: routes.dashboard.channelPerformance.social.path(
                params.organizationId,
                params.websiteId,
                params.dashboardId
              )
            },
            {
              label: t('general.channels.direct'),
              href: routes.dashboard.channelPerformance.direct.path(
                params.organizationId,
                params.websiteId,
                params.dashboardId
              )
            },
            {
              label: t('general.channels.email'),
              href: routes.dashboard.channelPerformance.email.path(
                params.organizationId,
                params.websiteId,
                params.dashboardId
              )
            }
          ]}
        />
      </TopBarWrapper>
      <Flex w="100%" mt={SPACING.xxxl} direction="column">
        {children}
      </Flex>
    </>
  );
}
