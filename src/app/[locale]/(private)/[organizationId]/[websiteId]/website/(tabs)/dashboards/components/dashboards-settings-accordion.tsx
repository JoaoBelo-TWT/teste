import { Plus } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';

import { AccessLevel, GetDashboardsQuery } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { Button } from '@/components/ui/button';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import DashboardsSettings from './dashboard-settings';
import DashboardClientAccordion from './dashboards-client-accordion';

export default async function WebsiteDashboardsSettings({
  dashboardsData,
  accessLevel,
  organizationId,
  websiteId
}: {
  dashboardsData: GetDashboardsQuery;
  accessLevel: AccessLevel;
  organizationId: string;
  websiteId: string;
}) {
  const t = await getTranslations();
  const accordionItems = dashboardsData.dashboards.edges.map((dashboard) => ({
    id: dashboard.node.id,
    title: t(`dashboard.type.executive`),
    content: (
      <DashboardsSettings
        organizationId={organizationId}
        dashboard={dashboard.node}
        viewOnly={accessLevel === AccessLevel.Read}
      />
    )
  }));

  return (
    <BaseCard
      headerProps={{
        title: t('website.dashboards.title')
      }}
    >
      <DashboardClientAccordion accordionItems={accordionItems} />
      <Button href={routes.dashboard.new.path(organizationId, websiteId)} mt={SPACING.md} variant="light" miw={'100%'}>
        <Plus />
      </Button>
    </BaseCard>
  );
}
