'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useNavigationStore } from '@/context/navigation/store';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

export function ShowMoreButton() {
  const t = useTranslations();
  const { filters, setFilters } = useNavigationStore();

  const showMoreCards = () => {
    setFilters({
      [DashboardQueryParams.notifications.key]: +filters.notifications + DashboardQueryParams.notifications.default
    });
  };

  return (
    <Button size="medium" variant="outline" onClick={showMoreCards}>
      {t('common.showMore')}
    </Button>
  );
}
