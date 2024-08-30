import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationQuery } from '@/lib/apollo/queries/dashboard-organization';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';
import { routes } from '@/routes/routes';

import { AuthorizedTeamInvitationButton } from './button';

async function getContinueRoute(organizationId: string) {
  const { data: organizationData } = await getClient()
    .query({
      query: getOrganizationQuery,
      variables: {
        organizationId
      }
    })
    .catch(() => ({
      data: null
    }));
  const organization = organizationData?.organization;

  if (organization?.defaultWebsiteId) {
    const websiteData = await getQueryWebsite(organization.defaultWebsiteId);
    const website = websiteData?.website;

    if (website?.defaultDashboardId) {
      return routes.dashboard.homePage.path(organization.id, website.id, website.defaultDashboardId);
    }
  }

  return routes.homePage.path;
}

export async function AuthorizedTeamInvitation({ organizationId }: Readonly<{ organizationId: string }>) {
  const t = await getTranslations();
  const continueRoute = await getContinueRoute(organizationId);

  return (
    <Link href={continueRoute}>
      <AuthorizedTeamInvitationButton>{t('common.continue')}</AuthorizedTeamInvitationButton>
    </Link>
  );
}
