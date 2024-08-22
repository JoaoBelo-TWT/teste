import React, { PureComponent } from 'react';

interface CustomizedAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value?: string | number;
  };
}

class CustomizedAxisTick extends PureComponent<CustomizedAxisTickProps> {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={42} textAnchor="middle" style={{ fontSize: '14px' }}>
          {payload?.value}
        </text>
      </g>
    );
  }
}

export default CustomizedAxisTick;
