import { Flex, Skeleton } from '@mantine/core';

export function TopBarSkeleton() {
  return (
    <Flex mih={80} align="center" justify="space-between">
      <Skeleton height={40} w={395} />
      <Skeleton height={40} w={275} radius="100" />
    </Flex>
  );
}
