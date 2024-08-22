import { Flex, Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

export default function WebsiteDetailsPageLoading() {
  return (
    <Flex w="100%">
      <BaseCard paperProps={{ w: '100%' }}>
        <Skeleton h={35} w={210} mb={32} />
        <Skeleton h={430} w="100%" mb={32} />
      </BaseCard>
    </Flex>
  );
}
