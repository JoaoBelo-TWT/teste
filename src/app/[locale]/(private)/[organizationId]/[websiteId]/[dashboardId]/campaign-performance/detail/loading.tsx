import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';
import { LoadingBreadcrumbs } from '@/components/ui/breadcrumbs/loading';
import { StatsList } from '@/components/ui/stats-list';
import { SPACING } from '@/resources/constants';

export default function LoadingFunnelsDeepDiveDetail() {
  return (
    <>
      <BaseCard
        topContent={<LoadingBreadcrumbs crumbsCount={4} />}
        paperProps={{ h: 'auto', mb: SPACING.xs }}
        headerProps={{
          title: <LoadingBreadcrumbs crumbsCount={2} variant="large" />,
          children: <Skeleton radius={100} h={44} w={153} mt={SPACING.sm} />
        }}
      >
        <StatsList
          mt={42}
          variant="large"
          list={[
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' }
          ]}
          loading
        />
        <Skeleton mt={50} h={400} w="100%" radius={10} />
      </BaseCard>
    </>
  );
}
