import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { ConnectionsList } from '@/components/lists/connections';
import { BaseCard } from '@/components/ui/base-card';

export default async function WebsiteConnectionsPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations('website.connections');

  const { websiteId, organizationId } = params;

  return (
    <Flex>
      <BaseCard
        headerProps={{
          title: t('title')
        }}
      >
        <ConnectionsList organizationId={organizationId} websiteId={websiteId} onboarding={false} />
      </BaseCard>
    </Flex>
  );
}
