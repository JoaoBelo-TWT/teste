'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { ShowMoreButtonProps } from '../types';

export function ShowMoreButton({ campaignsLength, onClick, isLoading }: Readonly<ShowMoreButtonProps>) {
  const t = useTranslations('dashboard.overview.campaignsCard');

  return (
    <Button size="medium" variant="outline" onClick={isLoading ? undefined : onClick} loading={isLoading}>
      {t('showMoreButton', { number: campaignsLength })}
    </Button>
  );
}
