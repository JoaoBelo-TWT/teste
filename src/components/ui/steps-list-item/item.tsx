import { Text } from '@mantine/core';
import clsx from 'clsx';
import { ReactElement } from 'react';

import classes from './index.module.css';

export function StepItem({
  description,
  stepNumber,
  endContent,
  bottomContent,
  noBorder
}: Readonly<{
  description: string | ReactElement;
  stepNumber: string;
  endContent?: ReactElement;
  bottomContent?: ReactElement;
  noBorder?: boolean;
}>) {
  return (
    <div
      className={clsx(
        classes['steps-list-item'],
        { [classes['steps-list-item__snippet']]: bottomContent },
        { [classes['steps-list-item--no-border']]: noBorder }
      )}
    >
      <div className={classes['steps-list-item__description']}>
        <div className={classes['steps-list-item__number']}>
          <Text fz={12}>{stepNumber}</Text>
        </div>
        {typeof description === 'string' ? (
          <Text fz="body1" lh="body2">
            {description}
          </Text>
        ) : (
          description
        )}
      </div>
      {endContent}
    </div>
  );
}
