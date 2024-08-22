import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import NavigationTabs from '@/components/navigation/tabs';
import TopBarWrapper from '@/components/wrappers/top-bar';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

export default async function OrganizationSettingsLayout({
  params,
  children
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string; websiteId: string };
}>) {
  const t = await getTranslations();
  return (
    <>
      <TopBarWrapper>
        <NavigationTabs
          // eslint-disable-next-line i18next/no-literal-string
          preserveQueryParams={['timeframe']}
          tabs={[
            {
              label: t('organization-settings.organizationDetails'),
              href: routes.organizationSettings.organizationDetails.path(params.organizationId, params.websiteId)
            },
            {
              label: t('organization-settings.teamMembers'),
              href: routes.organizationSettings.teamMembers.path(params.organizationId, params.websiteId)
            }
          ]}
        />
      </TopBarWrapper>
      <Flex w="100%" mt={SPACING.xxxl}>
        {children}
      </Flex>
    </>
  );
}
