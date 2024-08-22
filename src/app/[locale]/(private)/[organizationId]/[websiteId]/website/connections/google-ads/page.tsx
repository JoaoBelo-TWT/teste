import { Flex } from '@mantine/core';

import { ContentContainer } from '@/components/layouts/content-container';
import { BackButton } from '@/components/navigation/back-button';
import { GoogleAddsSetupCard } from '@/components/sections/google-adds-setup';
import { BaseCard } from '@/components/ui/base-card';
import { SPACING } from '@/resources/constants';

export default function ConnectGoogleAddsPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  return (
    <Flex direction="column" gap={30}>
      <BaseCard>
        <BackButton />
        <ContentContainer noHeader pb={SPACING.md} flex={1} mih={0}>
          <GoogleAddsSetupCard
            websiteId={params.websiteId}
            organizationId={params.organizationId}
            redirectToConnectionsPage
          />
        </ContentContainer>
      </BaseCard>
    </Flex>
  );
}
