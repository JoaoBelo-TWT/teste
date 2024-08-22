import { GridProps } from '@mantine/core';
import { useFormatter, useTranslations } from 'next-intl';

import { CampaignPerformance } from '@/__generated__/graphql';
import { StatsList } from '@/components/ui/stats-list';
import { formatNumber } from '@/utils/formatters/numbers';

export default function CampaignStatsList({
  currency,
  data,
  styleProps
}: Readonly<{
  data: CampaignPerformance;
  currency: string;
  styleProps?: GridProps;
}>) {
  const t = useTranslations();
  const format = useFormatter();

  return (
    <StatsList
      style={{ whiteSpace: 'no-wrap' }}
      colProps={{ span: 'content' }}
      list={[
        {
          value: formatNumber({
            value: data.totalVisits || 0,
            nextIntlFormatter: format,
            options: { notation: 'compact' }
          }),
          label: t('deepDives.stats.visits')
        },
        {
          value: formatNumber({
            value: data.totalSpend || 0,
            nextIntlFormatter: format,
            options: { style: 'currency', currency, notation: 'compact' }
          }),
          label: t('deepDives.stats.spend')
        },
        {
          value: formatNumber({
            value: data.cpl.cost || 0,
            nextIntlFormatter: format,
            options: { style: 'currency', currency, notation: 'compact' }
          }),
          label: t('common.costPerByName', { channel: data.cpl.label })
        },
        {
          value: formatNumber({
            value: data.cpc.cost || 0,
            nextIntlFormatter: format,
            options: { style: 'currency', currency, notation: 'compact' }
          }),
          label: t('common.costPerByName', { channel: data.cpc.label })
        },
        {
          value: data.firstStageTotals.total || 0,
          label: `${t('deepDives.stats.total')} ${data.firstStageTotals.stageLabel}`
        },
        {
          value: data.lastStageTotals.total || 0,
          label: `${t('deepDives.stats.total')} ${data.lastStageTotals.stageLabel}`
        },
        {
          value: data.topPerformer ?? '',
          label: t('deepDives.stats.topPerformer'),
          variant: 'avatar'
        }
      ]}
      {...styleProps}
      variant="default"
    />
  );
}
