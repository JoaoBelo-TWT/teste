'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { FunnelChart } from '@/components/charts/funnel-chart';
import { BaseCard } from '@/components/ui/base-card';
import { useNavigationStore } from '@/context/navigation/store';
import { routes } from '@/routes/routes';

import classes from './index.module.css';
import { JourneyUIProps } from './types';

export function CustomerJourneyUI({
  viewOnly,
  headerTitle,
  headerChildren,
  funnels,
  endContent
}: Readonly<JourneyUIProps>) {
  const params = useParams<{ organizationId: string; websiteId: string; dashboardId: string }>();
  const { filters } = useNavigationStore();

  return (
    <BaseCard id="funnel-performance" headerProps={{ title: headerTitle, children: headerChildren }}>
      <div className={classes['customer-journey__wrapper']}>
        <div className={classes['customer-journey__container']}>
          {viewOnly
            ? funnels.map((item) => <FunnelChart key={item.title} {...item} />)
            : funnels.map((item) => (
                <Link
                  className={classes['customer-journey__link']}
                  key={item.title}
                  // eslint-disable-next-line max-len
                  href={routes.dashboard.funnelPerformance.path(
                    params.organizationId,
                    params.websiteId,
                    params.dashboardId,
                    item.id,
                    filters.timeframe
                  )}
                >
                  <FunnelChart {...item} />
                </Link>
              ))}
        </div>
        {endContent}
      </div>
    </BaseCard>
  );
}
