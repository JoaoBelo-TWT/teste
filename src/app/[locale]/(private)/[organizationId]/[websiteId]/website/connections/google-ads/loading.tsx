import { Box, Flex, Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { SPACING } from '@/resources/constants';

export default function ConnectGoogleAddsPageLoading() {
  return (
    <Flex>
      <BaseCard>
        <Skeleton h={42} w={42} radius={100} />
        <LeftRightWrapper
          leftContent={
            <Flex w="100%" direction="column" gap={SPACING.sm}>
              <Box>
                <Skeleton h={40} w={210} mb={6} />
                <Skeleton h={40} w={260} mb={6} />
                <Skeleton h={40} w={395} mb={6} />
              </Box>
              <Skeleton h={38} w={395} mb={28} />
              <Skeleton h={204} w={395} mb={4} radius={24} />
            </Flex>
          }
          rightContent={
            <Box>
              <Skeleton h={520} w={395} mb={40} radius={24} />
              <Skeleton h={42} w={187} radius={100} />
            </Box>
          }
        />
      </BaseCard>
    </Flex>
  );
}
