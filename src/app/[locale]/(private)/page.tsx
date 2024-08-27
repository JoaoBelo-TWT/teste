import { notFound, redirect } from 'next/navigation';

import { getQueryDashboard } from '@/lib/react-query/dashboard/get-query-dashboard';
import { getMe } from '@/lib/react-query/get-query-fetch-me';
import { getQueryOrganization } from '@/lib/react-query/organization/get-query-organization';
import { getQueryWebsite } from '@/lib/react-query/website/get-query-website';
import { routes } from '@/routes/routes';

export default async function HomePage() {
  let redirectRoute;

  const user = await getMe();

  // Redirect to account setup if no organization is linked to the user.
  if (user.me.defaultOrganizationId) {
    const organizationData = await getQueryOrganization(user.me.defaultOrganizationId);

    // If user has a default organization, and organization has one website fetch details of that website.
    if (organizationData.organization.defaultWebsiteId) {
      const websiteData = await getQueryWebsite(organizationData.organization.defaultWebsiteId);

      // If website has a default dashboard, navigate to dashboard homePage.
      if (websiteData?.website.defaultDashboardId) {
        const dashboardData = await getQueryDashboard(websiteData.website.defaultDashboardId);

        if (dashboardData) {
          redirectRoute = routes.dashboard.homePage.path(
            user.me.defaultOrganizationId,
            websiteData.website.id,
            dashboardData.dashboard.id
          );
        }
      } else {
        // If no default dashboard, redirect to the dashboard creation page.
        redirectRoute = routes.dashboard.new.path(
          user.me.defaultOrganizationId,
          organizationData.organization.defaultWebsiteId
        );
      }
    } else {
      // If no default website for organization, redirect to the website setup.
      redirectRoute = routes.website.setup.start.path(user.me.defaultOrganizationId);
    }
  } else {
    // If user is not associated with any organization, redirect to organization setup.
    redirectRoute = routes.account.setup.step2.path;
  }

  if (redirectRoute) {
    redirect(redirectRoute);
  }

  notFound();
}
