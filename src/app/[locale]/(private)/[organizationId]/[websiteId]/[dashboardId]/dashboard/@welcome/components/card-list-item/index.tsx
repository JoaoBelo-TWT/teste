import { Text } from '@mantine/core';

import classes from './index.module.css';

export function CardListItem({ label, value }: Readonly<{ label: string; value?: string | number }>) {
  return (
    <div className={classes['card-list-item']}>
      <Text fz="caption2" lh="body2" tt="uppercase">
        {label}
      </Text>
      <Text fz="stat3" lh="state2" tt="uppercase" fw={450} truncate>
        {value}
      </Text>
    </div>
  );
}
