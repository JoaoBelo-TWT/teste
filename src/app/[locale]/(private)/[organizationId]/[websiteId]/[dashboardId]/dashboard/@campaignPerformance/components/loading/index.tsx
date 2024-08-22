'use client';

import { SimpleGrid, Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';
import { StatsList } from '@/components/ui/stats-list';
import { useNavigationStore } from '@/context/navigation/store';

import campaignsClasses from '../campaigns-card/index.module.css';
import headerButtonsClasses from '../header-buttons/index.module.css';

import { FiguresCardSkeleton } from './components/figures-card-skeleton';

export function CampaignsSkeleton() {
  const { filters } = useNavigationStore();

  const cards = Array.from({ length: filters.campaignCards }, (_, index) => <FiguresCardSkeleton key={index} />);

  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={200} />,
        children: (
          <div className={headerButtonsClasses['header-buttons__container']}>
            <Skeleton height={44} width={100} radius={'xl'} />
            <Skeleton height={44} width={180} radius={'xl'} />
          </div>
        )
      }}
    >
      <div className={campaignsClasses['campaigns-card__container']}>
        <StatsList
          variant="large"
          list={[
            { value: 1, label: '1' },
            { value: 2, label: '2' }
          ]}
          loading
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 8, md: 16 }} verticalSpacing={{ base: 8, md: 16 }}>
          {cards}
        </SimpleGrid>
        <div>
          <Skeleton height={44} width={140} radius={'xl'} />
        </div>
      </div>
    </BaseCard>
  );
}
