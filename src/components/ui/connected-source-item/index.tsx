import { Url } from 'url';

import { Box, Text } from '@mantine/core';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { GetWebsiteQuery, HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/ui/item-card';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';
import { CRM, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

export async function ConnectedSourceItem({
  websiteId,
  dashboardId,
  organizationId,
  label,
  isOnboarding
}: {
  websiteId: string;
  dashboardId: string;
  organizationId: string;
  label?: string;
  isOnboarding?: boolean;
}) {
  const websiteData = await getQueryWebsite(websiteId);
  const data = await fetchFunnelStages(dashboardId);
  const noFunnels = data?.customerFunnelStages?.edges && data?.customerFunnelStages.edges.length <= 0;
  const t = await getTranslations();

  function getActiveIntegrationName(website: GetWebsiteQuery | null): string | null {
    if (noFunnels) {
      return t('onboarding.selectSource.noFunnelsSetup');
    }

    if (website?.website?.hubspotIntegrationStatus === HubspotIntegrationStatus.Active) {
      return t('onboarding.selectSource.crmList.hubspot');
    }

    if (website?.website?.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active) {
      return t('onboarding.selectSource.crmList.salesforce');
    }

    return t('onboarding.setup.step3.websiteTracking');
  }

  function getActiveIntegrationImage(website: GetWebsiteQuery | null): string | undefined {
    if (noFunnels) {
      return undefined;
    }

    if (website?.website?.hubspotIntegrationStatus === HubspotIntegrationStatus.Active) {
      return `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/hubspot.webp`;
    }

    if (website?.website?.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active) {
      return `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/salesforce.webp`;
    }

    if (website?.website.imageUrl) {
      return website?.website.imageUrl;
    }
    // eslint-disable-next-line i18next/no-literal-string
    return '/logo.webp';
  }

  function getButtonLink(website: GetWebsiteQuery | null): string | Url {
    if (noFunnels) {
      return routes.dashboard.dashboardCreate.customerFunnel.path(
        organizationId,
        websiteId,
        dashboardId,
        // TODO: SA-635 - When we have multiple dashboard types we can fetch this from the API
        OnboardingFlowType.EXECUTIVE
      );
    }

    if (website?.website?.hubspotIntegrationStatus === HubspotIntegrationStatus.Active) {
      return CRM.HUBSPOT;
    }

    if (website?.website?.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active) {
      return CRM.SALESFORCE;
    }

    return t('onboarding.setup.step3.websiteTracking');
  }

  function getButtonText(website: GetWebsiteQuery | null): string | undefined {
    if (noFunnels) {
      return t('onboarding.selectSource.defineFunnel');
    }

    if (website?.website?.hubspotIntegrationStatus === HubspotIntegrationStatus.Active) {
      return t('onboarding.selectSource.openHubspot');
    }

    if (website?.website?.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active) {
      return t('onboarding.selectSource.openSalesforce');
    }

    return undefined;
  }

  function getDescription(website: GetWebsiteQuery | null): string | undefined {
    if (website?.website?.hubspotIntegrationStatus === HubspotIntegrationStatus.Active) {
      return t('onboarding.selectSource.cantEditFunnels', { crm: t('onboarding.selectSource.crmList.hubspot') });
    }

    if (website?.website?.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active) {
      return t('onboarding.selectSource.cantEditFunnels', { crm: t('onboarding.selectSource.crmList.salesforce') });
    }

    return undefined;
  }

  const connectButton = <Button variant="light">{getButtonText(websiteData)}</Button>;

  return (
    <>
      {!noFunnels && (
        <Text c="dark.7" mb={SPACING.sm} fz={16} w="100%">
          {label ?? t('onboarding.selectSource.selectedSource')}
        </Text>
      )}
      <ItemCard
        w="100%"
        mb={SPACING.md}
        itemImage={getActiveIntegrationImage(websiteData)}
        itemName={getActiveIntegrationName(websiteData)}
        itemDescription={!isOnboarding ? getDescription(websiteData) : undefined}
        rightContent={
          getButtonText(websiteData) &&
          !isOnboarding && (
            <Box mt="auto" mb="auto">
              {noFunnels ? (
                <Link href={getButtonLink(websiteData)}>{connectButton}</Link>
              ) : (
                <a href={getButtonLink(websiteData) as string} target="_blank">
                  {connectButton}
                </a>
              )}
            </Box>
          )
        }
      />
    </>
  );
}
