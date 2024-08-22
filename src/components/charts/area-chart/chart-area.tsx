'use client';

import { getThemeColor } from '@mantine/core';
import { Fragment } from 'react';
import { Area } from 'recharts';

import { AreaGradient } from './area-gradient';
import { AreaProps } from './types';

export function renderChartArea({
  item,
  theme,
  styles,
  baseId,
  curveType,
  shouldHighlight,
  highlightedArea,
  connectNulls,
  stacked,
  splitId,
  strokeWidth,
  type
}: Readonly<AreaProps>) {
  const id = `${baseId}-${item.color?.replace(/[^a-zA-Z0-9]/g, '')}`;
  const color = getThemeColor(item.color, theme);
  const dimmed = shouldHighlight && highlightedArea !== item.name;

  return (
    <Fragment key={item.name}>
      <defs>
        <AreaGradient id={id} gradientStops={item.gradientStops} />
        <clipPath id={`${id}-rounded-corners`}>
          <rect x="0" y="0" width="100%" height="100%" rx={item.radius ?? 0} ry={item.radius ?? 0} />
        </clipPath>
      </defs>
      <Area
        clipPath={`url(#${id}-rounded-corners)`}
        {...styles}
        activeDot={false}
        dot={false}
        name={item.name}
        type={curveType}
        dataKey={item.name}
        fill={type === 'split' ? `url(#${splitId})` : `url(#${id})`}
        strokeWidth={strokeWidth}
        stroke={color}
        isAnimationActive={false}
        connectNulls={connectNulls}
        stackId={stacked ? 'stack' : undefined}
        fillOpacity={dimmed ? 0 : 1}
        strokeOpacity={dimmed ? 0.5 : 1}
        strokeDasharray={item.strokeDasharray}
      />
    </Fragment>
  );
}
