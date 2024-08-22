import { Flex, Skeleton } from '@mantine/core';

import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { SPACING } from '@/resources/constants';

import { StageEventFormSkeletonLoading } from './form';

export function StageEventSkeletonLoading() {
  return (
    <LeftRightWrapper
      leftContent={
        <Flex gap={SPACING.md} direction="column" miw={500}>
          <Flex gap={SPACING.xs} direction="column">
            <Skeleton h={49} w={400} />
            <Skeleton h={49} w={150} />
          </Flex>
          <Skeleton h={20} w={500} />
        </Flex>
      }
      rightContent={<StageEventFormSkeletonLoading />}
    />
  );
}
