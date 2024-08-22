'use client';

import { CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { IconButton } from '@/components/ui/icon-button';
import { ItemCard } from '@/components/ui/item-card';
import { routes } from '@/routes/routes';

export default function WebsiteTrackingItem({
  disabled,
  websiteImage = '/logo.webp'
}: {
  disabled?: boolean;
  websiteImage?: string;
}) {
  const params = useParams<{ organizationId: string; dashboardId: string; websiteId: string }>();
  const t = useTranslations();

  return (
    <ItemCard
      itemName={t('onboarding.setup.step3.websiteTracking')}
      itemImage={websiteImage}
      rightContent={
        <Link
          href={routes.dashboard.dashboardCreate.createStages.path(
            params.organizationId,
            params.websiteId,
            params.dashboardId
          )}
          // eslint-disable-next-line i18next/no-literal-string
          style={{ pointerEvents: disabled ? 'none' : 'initial' }}
        >
          <IconButton disabled={disabled} color="var(--mantine-color-dark-9)" variant="light" size={32} radius={100}>
            <CaretRight size={16} />
          </IconButton>
        </Link>
      }
    />
  );
}
