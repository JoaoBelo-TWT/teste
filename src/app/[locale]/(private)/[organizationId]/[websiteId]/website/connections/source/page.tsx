import { Flex } from '@mantine/core';

import { ContentContainer } from '@/components/layouts/content-container';
import { BackButton } from '@/components/navigation/back-button';
import { WebsiteSetupCard } from '@/components/sections/website-setup-card';
import { BaseCard } from '@/components/ui/base-card';
import { SPACING } from '@/resources/constants';

export default function ConnectPage({ params }: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  return (
    <Flex direction="column" gap={30}>
      <BaseCard>
        <BackButton />
        <ContentContainer noHeader pb={SPACING.md} flex={1} mih={0}>
          <WebsiteSetupCard
            websiteId={params.websiteId}
            organizationId={params.organizationId}
            onboarding={false}
            redirectToConnectionsPage
          />
        </ContentContainer>
      </BaseCard>
    </Flex>
  );
}
