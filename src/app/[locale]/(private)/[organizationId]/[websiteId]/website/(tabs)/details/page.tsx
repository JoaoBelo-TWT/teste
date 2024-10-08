import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { AccessLevel } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { getQueryWebsiteSelectors } from '@/lib/react-query/website/query-selectors';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';

import WebsiteDetailsList from './components/website-settings-list';
import { WebsiteSettingsPixel } from './components/website-settings-pixel';

export default async function WebsiteDetailsPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations('website.details');
  const websiteData = await getQueryWebsite(params.websiteId);
  const userLevel = await useUserAccessLevel({ organizationId: params.organizationId });
  const data = await getQueryWebsiteSelectors(params.websiteId);

  return (
    <Flex direction="column" flex={1} gap={16}>
      <BaseCard
        headerProps={{
          title: t('title')
        }}
      >
        {websiteData && <WebsiteDetailsList websiteData={websiteData} viewOnly={userLevel === AccessLevel.Read} />}
      </BaseCard>

      <BaseCard
        headerProps={{
          title: t('pixel.title')
        }}
      >
        {websiteData && <WebsiteSettingsPixel websiteData={websiteData} websiteSelectors={data} />}
      </BaseCard>
    </Flex>
  );
}
