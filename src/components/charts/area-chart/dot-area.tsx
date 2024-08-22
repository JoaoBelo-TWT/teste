import { getThemeColor } from '@mantine/core';
import { Area, Dot } from 'recharts';

import { CustomDotProps, DotAreaProps } from './types';

const CustomDot = (props: CustomDotProps) => {
  if (props.hideAll || props?.payload?.hideDot || (props?.name && !props?.payload?.[props?.name])) {
    return null;
  }

  return <Dot {...props} />;
};

export function renderDotArea({
  item,
  theme,
  highlightedArea,
  shouldHighlight,
  curveType,
  strokeWidth,
  connectNulls,
  stacked,
  activeDotProps,
  dotProps,
  styles
}: Readonly<DotAreaProps>) {
  const color = getThemeColor(item.color, theme);
  const dimmed = shouldHighlight && highlightedArea !== item.name;

  const customDotProps = { fill: color, fillOpacity: dimmed ? 0 : 1, strokeWidth: 2, r: 4, ...dotProps };

  return (
    <Area
      key={item.name}
      {...styles}
      activeDot={{ fill: theme.white, stroke: color, strokeWidth: 2, r: 4, ...activeDotProps }}
      dot={<CustomDot {...customDotProps} />}
      name={item.name}
      type={curveType}
      dataKey={item.name}
      fill="none"
      strokeWidth={strokeWidth}
      stroke="none"
      isAnimationActive={false}
      connectNulls={connectNulls}
      stackId={stacked ? 'stack-dots' : undefined}
    />
  );
}
