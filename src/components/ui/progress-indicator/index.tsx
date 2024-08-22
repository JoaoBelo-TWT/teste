import clsx from 'clsx';

import classes from './index.module.css';

interface ProgressIndicatorProps {
  'aria-label'?: string;
  value: number;
  className?: string;
}

const MIN_VALUE = 0;
const MAX_VALUE = 100;

export function ProgressIndicator(props: Readonly<ProgressIndicatorProps>) {
  return (
    <div className={clsx(classes['progress-indicator'], props.className)}>
      <div
        className={classes['progress-indicator__bar']}
        role="progressbar" // NOSONAR
        aria-valuemax={MAX_VALUE}
        aria-valuemin={MIN_VALUE}
        aria-valuenow={props.value}
        aria-valuetext={`${props.value}%`}
        aria-label={props['aria-label'] || ''}
        style={{ '--visible-percentage': `${props.value}%` } as React.CSSProperties}
      />
    </div>
  );
}
