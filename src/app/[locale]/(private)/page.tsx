import { notFound, redirect } from 'next/navigation';

import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationQuery } from '@/lib/apollo/queries/dashboard-organization';
import { fetchDashboardData } from '@/lib/fetch-dashboard-data';
import { fetchMeData } from '@/lib/fetch-me-data';
import { fetchWebsiteData } from '@/lib/fetch-website-data';
import { routes } from '@/routes/routes';
import { captureError } from '@/utils/errors/capture-error';

export default async function HomePage() {
  let redirectRoute;

  try {
    const user = await fetchMeData();

    // Redirect to account setup if no organization is linked to the user.
    if (user.me.defaultOrganizationId) {
      const { data: organizationData } = await getClient().query({
        query: getOrganizationQuery,
        variables: {
          organizationId: user.me.defaultOrganizationId
        }
      });

      // If user has a default organization, and organization has one website fetch details of that website.
      if (organizationData.organization.defaultWebsiteId) {
        const websiteData = await fetchWebsiteData(organizationData.organization.defaultWebsiteId);

        // If website has a default dashboard, navigate to dashboard homePage.
        if (websiteData?.website.defaultDashboardId) {
          const dashboardData = await fetchDashboardData(websiteData.website.defaultDashboardId);

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
  } catch (error) {
    captureError(error);
  }

  if (redirectRoute) {
    redirect(redirectRoute);
  }

  notFound();
}
