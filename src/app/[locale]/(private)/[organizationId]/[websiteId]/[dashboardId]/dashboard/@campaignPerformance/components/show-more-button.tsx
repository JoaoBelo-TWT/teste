'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useNavigationStore } from '@/context/navigation/store';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

import { ShowMoreButtonProps } from '../types';

export function ShowMoreButton({ campaignsLength }: Readonly<ShowMoreButtonProps>) {
  const t = useTranslations('dashboard.overview.campaignsCard');
  const { filters, setFilters } = useNavigationStore();

  const showMoreCards = () => {
    setFilters({
      [DashboardQueryParams.campaignCards.key]: +filters.campaignCards + DashboardQueryParams.campaignCards.default
    });
  };

  return (
    <Button size="medium" variant="outline" onClick={showMoreCards}>
      {t('showMoreButton', { number: campaignsLength })}
    </Button>
  );
}
