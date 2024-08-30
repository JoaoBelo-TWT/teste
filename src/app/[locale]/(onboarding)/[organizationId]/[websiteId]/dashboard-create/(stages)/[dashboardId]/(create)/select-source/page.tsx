import { Box, Flex, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { ConnectionsCRMList } from '@/components/lists/connections/crm';
import { TextContent } from '@/components/ui/text-content';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';
import { SPACING } from '@/resources/constants';

import WebsiteTrackingItem from './components/website-tracking';

export default async function SelectSourcePage({
  params
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string };
}>) {
  const t = await getTranslations();
  const websiteData = await getQueryWebsite(params.websiteId);

  const connectedToCRM =
    websiteData?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active ||
    websiteData?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active;

  return (
    <Flex p={SPACING.md} w={600} direction="column">
      <TextContent
        mb={SPACING.sm}
        title={t('onboarding.selectSource.title')}
        description={t('onboarding.selectSource.description')}
      />
      <Box mb={SPACING.xl}>
        <Text c="dark.7" mb={SPACING.sm} fz={14}>
          {t('onboarding.selectSource.crmList.label')}
        </Text>
        {websiteData?.website && <ConnectionsCRMList websiteData={websiteData} />}
      </Box>

      <Text c="dark.7" mb={SPACING.sm} fz={14}>
        {t('onboarding.selectSource.selfServeLabel')}
      </Text>
      <WebsiteTrackingItem websiteImage={websiteData?.website.imageUrl} disabled={connectedToCRM} />
    </Flex>
  );
}
