import { Flex, Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

export default function OrganizationSettingsTeamMembersLoading() {
  return (
    <Flex w="100%">
      <BaseCard paperProps={{ w: '100%' }}>
        <Flex justify="space-between" mb={40}>
          <Skeleton h={35} w={210} />
          <Skeleton h={40} w={193} radius={100} />
        </Flex>
        <Skeleton h={130} w="100%" mb={24} />
        <Skeleton ml="auto" h={35} w={500} mb={32} />
      </BaseCard>
    </Flex>
  );
}
