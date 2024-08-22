import { Flex, Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

export default function WebsiteConnectionsPageLoading() {
  return (
    <Flex>
      <BaseCard>
        <Skeleton h={35} w={210} mb={96} />
        <Skeleton h={430} w="100%" mb={32} />
      </BaseCard>
    </Flex>
  );
}
