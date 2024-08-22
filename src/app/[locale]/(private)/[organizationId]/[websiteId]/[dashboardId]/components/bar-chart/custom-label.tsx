import React from 'react';

import { COLORS } from '@/resources/constants';

import { FunnelOverviewData } from './types';

export const renderCustomizedLabel = (props: FunnelOverviewData) => {
  const { x = 0, y = 0, data, name } = props;
  const labelData = data.find((item) => item.name === name);

  const xNum = typeof x === 'number' ? x : Number(x);
  const yNum = typeof y === 'number' ? y + 2 : Number(y) + 2;

  // where there is only a total number and no division by paid and organic
  if (labelData?.paidCount === null && labelData?.organicCount === null) {
    const yNumber = typeof y === 'number' ? y + 22 : Number(y) + 22;

    return (
      <svg>
        <g>
          <text font-size="24" fill={COLORS.brandNavy} x={xNum + 10} y={yNumber - 38}>
            {labelData?.totalCount}
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg>
      <g>
        <text font-size="24" fill={COLORS.brandNavy} x={xNum + 10} y={yNum - 38}>
          {labelData?.totalCount}
        </text>
      </g>

      <g>
        <rect x={xNum + 10} y={yNum - 26} width="4" height="14" fill={labelData?.color} rx="3" opacity={0.6} />
        <text
          fontWeight={400}
          x={xNum + 20}
          y={yNum - 15}
          font-size="12"
          fill={COLORS.brandNavy}
          fontFamily="Universal Sans"
        >
          {props.organicTranslation}
        </text>
        <text
          fontWeight={400}
          x={xNum + 78}
          y={yNum - 15}
          fontFamily="Universal Sans"
          font-size="12px"
          fill={COLORS.brandNavy}
        >
          {labelData?.organicCount}
        </text>
      </g>

      <line x1={xNum + 100} y1={yNum - 26} x2={xNum + 100} y2={yNum - 10} stroke={COLORS.lightGray} stroke-width="2" />

      <g>
        <rect x={xNum + 115} y={yNum - 26} width="4" height="14" fill={labelData?.color} rx="3" />
        <text
          fontWeight={400}
          x={xNum + 125}
          y={yNum - 15}
          font-size="12"
          fill={COLORS.brandNavy}
          fontFamily="Universal Sans"
        >
          {props.paidTranslation}
        </text>
        <text
          fontWeight={400}
          x={xNum + 158}
          y={yNum - 15}
          fontFamily="Universal Sans"
          font-size="12px"
          fill={COLORS.brandNavy}
        >
          {labelData?.paidCount}
        </text>
      </g>
    </svg>
  );
};
