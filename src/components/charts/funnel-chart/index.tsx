import { Text } from '@mantine/core';
import clsx from 'clsx';
import { useFormatter, useTranslations } from 'next-intl';

import { AvatarChip } from '@/components/ui/avatar-chip';
import { StatusChip } from '@/components/ui/status-chip';
import { formatNumber } from '@/utils/formatters/numbers';

import classes from './index.module.css';
import { FunnelChartProps } from './types';

const DEFAULT_RADIUS = '12px';

export function getCardRadius({
  index,
  totalItems,
  radius = DEFAULT_RADIUS
}: {
  index: number;
  totalItems: number;
  radius?: string;
}) {
  return {
    borderTopLeftRadius: index === 0 ? radius : '0',
    borderBottomLeftRadius: index === 0 ? radius : '0',
    borderTopRightRadius: index === totalItems - 1 ? radius : '0',
    borderBottomRightRadius: index === totalItems - 1 ? radius : '0'
  };
}

export function getGradientRadius({
  index,
  totalItems,
  radius = DEFAULT_RADIUS
}: {
  index: number;
  totalItems: number;
  radius?: string;
}) {
  return {
    borderBottomLeftRadius: index === 0 ? radius : '0',
    borderBottomRightRadius: index === totalItems - 1 ? radius : '0'
  };
}

export function FunnelChart({
  title,
  trackedEventDescription,
  trackedEventImage,
  figureLabel,
  figureValue,
  rootStyles,
  percentageChange,
  percentage,
  gradientStyles,
  isPercentageVisible = true
}: Readonly<FunnelChartProps>) {
  const t = useTranslations();
  const format = useFormatter();

  const getGradientClass = (percent: number) => {
    if (percent <= 25) return 'low';
    if (percent <= 50) return 'medium';
    if (percent <= 75) return 'high';
    return 'full';
  };

  const percentageValue = percentage ?? 0;

  const currentPercentage = formatNumber({
    value: percentageValue,
    nextIntlFormatter: format,
    options: { style: 'percent' }
  });

  const value = formatNumber({
    value: Number(figureValue),
    nextIntlFormatter: format,
    options: { notation: 'compact' }
  });

  return (
    <div className={classes['funnel-chart__container']} style={rootStyles}>
      <div className={classes['funnel-chart__header']}>
        <Text fz="stat3" fw={400} lh="body2" c="var(--brand-navy-color)" truncate="end">
          {title}
        </Text>
        <div className={classes['funnel-chart__events']}>
          <Text fz="caption2" fw={400} lh="body2" tt="uppercase" c="var(--brand-navy-color)">
            {t('dashboard.overview.customerJourneyCard.trackedEvents')}
          </Text>
          {!!trackedEventDescription && <AvatarChip label={trackedEventDescription} image={trackedEventImage} />}
        </div>
      </div>
      <div className={classes['funnel-chart__progress-container']}>
        <div className={classes['funnel-chart__figures']}>
          <div className={classes['funnel-chart__figure-values']}>
            <Text fz="stat3" fw={400} lh="body2" c="var(--brand-navy-color)">
              {value}
            </Text>
            {isPercentageVisible && percentageValue > 0 && <StatusChip variant="default" label={currentPercentage} />}
          </div>
          <Text fz="caption2" fw={400} lh="body2" tt="uppercase" c="var(--brand-navy-color)">
            {figureLabel}
          </Text>
        </div>
        <div
          className={clsx(classes['funnel-chart__progress-bar'], {
            [classes[`funnel-chart__progress-bar--${getGradientClass(percentageChange)}`]]: percentageValue > 0
          })}
          style={{
            ...gradientStyles,
            height: `${percentageChange}%`
          }}
        />
      </div>
    </div>
  );
}
