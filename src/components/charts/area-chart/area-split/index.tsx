import { getThemeColor, useMantineTheme } from '@mantine/core';

import type { AreaSplitProps } from './types';

export function AreaSplit({ offset, id, colors, fillOpacity }: Readonly<AreaSplitProps>) {
  const theme = useMantineTheme();

  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset={offset} stopColor={getThemeColor(colors[0], theme)} stopOpacity={fillOpacity ?? 0.2} />
      <stop offset={offset} stopColor={getThemeColor(colors[1], theme)} stopOpacity={fillOpacity ?? 0.2} />
    </linearGradient>
  );
}
