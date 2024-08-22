import { getSession } from '@auth0/nextjs-auth0';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { Me } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationQuery } from '@/lib/apollo/queries/dashboard-organization';
import { fetchMeData } from '@/lib/fetch-me-data';
import { fetchWebsiteData } from '@/lib/fetch-website-data';
import { routes } from '@/routes/routes';
import { captureError } from '@/utils/errors/capture-error';
import { errorHasMessage } from '@/utils/errors/error-has-message';

async function getOrganizationWebsiteRedirectRoute(me: Me) {
  if (me.defaultOrganizationId) {
    const { data: organizationData } = await getClient().query({
      query: getOrganizationQuery,
      variables: {
        organizationId: me.defaultOrganizationId
      }
    });
    const organization = organizationData?.organization;

    if (!organization?.name || !organization?.companyIndustryId || !organization?.companySizeId) {
      return routes.account.setup.step2.path;
    }

    if (organization.defaultWebsiteId) {
      const websiteData = await fetchWebsiteData(organization.defaultWebsiteId);

      if (!websiteData?.website) {
        return routes.website.setup.start.path(organization.id);
      }
    }
  }

  return undefined;
}

async function getOnboardingRedirectRoute() {
  try {
    const session = await getSession();

    if (session) {
      const user = await fetchMeData();
      const { me } = user;

      if (me?.currentOnboardingPath) {
        return me.currentOnboardingPath;
      }

      if (!me?.firstName || !me?.lastName || !me?.companyRoleId) {
        return routes.account.setup.step1.path;
      }

      // check organization/website state
      return await getOrganizationWebsiteRedirectRoute(me);
    }
  } catch (error) {
    if (errorHasMessage(error, 'not found')) {
      return routes.account.setup.step1.path; // Fallback to step 1 if user data is still not in DB
    }

    captureError(error);
    notFound();
  }

  return undefined;
}

export async function OnboardingRedirect({ children }: Readonly<{ children: ReactNode }>) {
  const onboardingRoute = await getOnboardingRedirectRoute();

  if (onboardingRoute) {
    redirect(onboardingRoute);
  }

  return <>{children}</>;
}
