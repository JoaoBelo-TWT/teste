import { Check } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

import classes from './index.module.css';
import type { CheckComponentProps } from './types';

export function ProgressIcon({ isComplete = false }: Readonly<CheckComponentProps>) {
  return (
    <div
      className={clsx(
        classes['progress-icon__container'],
        isComplete && classes['progress-icon__container--is-complete']
      )}
    >
      {isComplete && <Check size={12} color="black" weight="bold" />}
    </div>
  );
}
