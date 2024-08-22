import clsx from 'clsx';

import classes from './index.module.css';

export function Dot({ color = 'green' }: Readonly<{ color?: 'green' | 'orange' }>) {
  return <div className={clsx(classes.dot, classes[`dot--${color}`])} />;
}
