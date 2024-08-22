import type { AreaGradientProps } from './type';

export function AreaGradient({ id, gradientStops }: Readonly<AreaGradientProps>) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {gradientStops.map(({ color, offset, opacity }) => (
        <stop key={`${color}-${offset}`} offset={offset} stopColor={color} stopOpacity={opacity} />
      ))}
    </linearGradient>
  );
}
