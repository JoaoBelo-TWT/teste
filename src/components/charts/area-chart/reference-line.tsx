import { getThemeColor } from '@mantine/core';
import { ReferenceLine } from 'recharts';

import { ReferenceLineProps } from './types';

export function renderReferenceLineItem({ item, theme, styles }: Readonly<ReferenceLineProps>) {
  const color = getThemeColor(item.color, theme);

  return (
    <ReferenceLine
      key={`${item.xAxisId}-${item.yAxisId}-${item.id}`}
      stroke={item.color ? color : 'var(--chart-grid-color)'}
      strokeWidth={1}
      {...item}
      label={{
        value: item.label,
        fill: item.color ? color : 'dark.2',
        fontSize: 12,
        position: item.labelPosition ?? 'insideBottomRight'
      }}
      {...styles}
    />
  );
}
