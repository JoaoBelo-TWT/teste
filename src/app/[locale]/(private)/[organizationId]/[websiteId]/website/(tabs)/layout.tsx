import { Flex, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import NavigationTabs from '@/components/navigation/tabs';
import { AvatarChip } from '@/components/ui/avatar-chip';
import TopBarWrapper from '@/components/wrappers/top-bar';
import { fetchWebsiteData } from '@/lib/fetch-website-data';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { beautifyUrl } from '@/utils/formatters/beutify-url';

import packageJson from '../../../../../../../../package.json';

export default async function WebsiteLayout({
  params,
  children
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string; websiteId: string };
}>) {
  const t = await getTranslations();
  const websiteDetails = await fetchWebsiteData(params.websiteId);
  return (
    <>
      <TopBarWrapper
        endContent={
          <AvatarChip
            variant="outlined"
            label={beautifyUrl(websiteDetails?.website.domain)}
            image={websiteDetails?.website.imageUrl}
          />
        }
      >
        <NavigationTabs
          tabs={[
            {
              label: t('website.details.title'),
              href: routes.website.details.path(params.organizationId, params.websiteId)
            },
            {
              label: t('website.dashboards.title'),
              href: routes.website.dashboards.path(params.organizationId, params.websiteId)
            }
          ]}
        />
      </TopBarWrapper>
      <Flex w="100%" direction="column" mt={SPACING.xxxl}>
        {children}
        <Text fz={14} c="dark.6" mt={SPACING.sm} ta="end">
          {`v${packageJson.version}`}
        </Text>
      </Flex>
    </>
  );
}
