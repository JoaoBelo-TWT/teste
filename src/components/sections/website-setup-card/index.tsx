import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { TextContent } from '@/components/ui/text-content';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';
import { SPACING } from '@/resources/constants';

import { ShareCard } from './share-card';
import { StepsList } from './steps-list';

export async function WebsiteSetupCard({
  websiteId,
  organizationId,
  onboarding = true,
  redirectToConnectionsPage = false
}: Readonly<{
  websiteId: string;
  organizationId?: string;
  onboarding?: boolean;
  redirectToConnectionsPage?: boolean;
}>) {
  const t = await getTranslations();
  const websiteData = await getQueryWebsite(websiteId);
  const websiteName = websiteData?.website.domain?.slice(0, -1);

  return (
    <LeftRightWrapper
      leftContent={
        <Flex direction="column" gap={SPACING.sm}>
          <TextContent
            title={t('onboarding.setup.step6.title')}
            description={t('onboarding.setup.step6.description')}
          />
          <ShareCard websiteId={websiteId} />
        </Flex>
      }
      rightContent={
        <StepsList
          websiteId={websiteId}
          websiteName={websiteName}
          organizationId={organizationId}
          onboarding={onboarding}
          hideContinueButton={false}
          redirectToConnectionsPage={redirectToConnectionsPage}
        />
      }
    />
  );
}
