import { SegmentedControl, SegmentedControlProps } from '@mantine/core';

import classes from './index.module.css';

export function ToggleGroup(props: SegmentedControlProps) {
  return (
    <SegmentedControl
      classNames={{
        root: classes['toggle-group__root'],
        label: classes['toggle-group__label'],
        indicator: classes['toggle-group__indicator'],
        control: classes['toggle-group__control']
      }}
      {...props}
    />
  );
}
