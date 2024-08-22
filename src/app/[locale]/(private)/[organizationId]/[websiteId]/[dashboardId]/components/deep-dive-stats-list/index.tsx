import { GridProps } from '@mantine/core';
import { useFormatter, useTranslations } from 'next-intl';

import { StatsList } from '@/components/ui/stats-list';
import { formatNumber } from '@/utils/formatters/numbers';

export default function DeepDiveStatsList({
  spend,
  costPerFunnel,
  currency,
  styleProps
}: Readonly<{
  spend?: number;
  costPerFunnel?: {
    costPer: number;
    name: string;
  }[];
  currency?: string;
  styleProps?: GridProps;
}>) {
  const t = useTranslations();
  const format = useFormatter();

  return (
    <StatsList
      list={[
        {
          value: formatNumber({
            value: spend || 0,
            nextIntlFormatter: format,
            options: { style: 'currency', currency, notation: 'compact' }
          }),
          label: t('onboarding.deepDive.stats.spend')
        },
        ...(costPerFunnel?.map(({ costPer, name }) => ({
          value: formatNumber({
            value: costPer,
            nextIntlFormatter: format,
            options: { style: 'currency', currency, notation: 'compact' }
          }),
          label: `Per ${name}`
        })) || [])
      ]}
      {...styleProps}
      w={'100%'}
      colProps={{ style: { flex: '0 0 auto' } }}
      variant="default"
    />
  );
}
