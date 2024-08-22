import { Flex, Skeleton } from '@mantine/core';

import { SPACING } from '@/resources/constants';

export function StageEventFormSkeletonLoading() {
  return (
    <Flex direction="column" w="100%" miw={500}>
      <Skeleton w="100%" mih={70} mb={SPACING.md} />
      <Skeleton w="100%" mih={390} mb={SPACING.md} />
    </Flex>
  );
}
