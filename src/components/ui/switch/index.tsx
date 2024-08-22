import { Switch as MantineSwitch, SwitchProps } from '@mantine/core';
import { forwardRef } from 'react';

import classes from './index.module.css';

export const Switch = forwardRef<HTMLInputElement, Readonly<SwitchProps>>((props, ref) => (
  <MantineSwitch
    ref={ref}
    className="switch"
    classNames={{
      root: classes.root,
      track: classes.track,
      thumb: classes.thumb,
      input: classes.input
    }}
    {...props}
  />
));

Switch.displayName = 'Switch';
