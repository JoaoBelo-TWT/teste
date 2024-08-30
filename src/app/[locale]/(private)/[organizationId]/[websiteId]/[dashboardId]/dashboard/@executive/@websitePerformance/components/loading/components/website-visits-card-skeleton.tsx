import { Box, Flex, Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import topSourcesCardClasses from '../../top-sources-card/index.module.css';

export function WebsiteVisitsCardSkeleton() {
  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={150} />
      }}
      paperProps={{ classNames: { root: topSourcesCardClasses['top-sources-card__card-root'] } }}
    >
      <Flex mt={8} justify="space-between" direction="column" flex={1}>
        <Skeleton height={16} width={50} />
        <Box>
          <Skeleton mb={8} height={32} width={100} />
          <Skeleton height={16} width={50} />
        </Box>
      </Flex>
    </BaseCard>
  );
}
