import { Paper, Text } from '@mantine/core';
import { DotsNine } from '@phosphor-icons/react';
import { forwardRef } from 'react';

import classes from './index.module.css';
import type { CardItemProps } from './types';

export const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  ({ children, isDraggable, dragHandleProps, isFirst, isLast, itemIndex }, ref) => (
    <Paper classNames={{ root: classes['card-item__root'] }} data-first={isFirst} data-last={isLast}>
      {isDraggable && (
        <div className={classes['card-item__button-container']}>
          <div className={classes['card-item__dnd-icon-container']} {...dragHandleProps} ref={ref}>
            <DotsNine size={24} />
          </div>
        </div>
      )}
      {itemIndex && (
        <div className={classes['card-item__index-text']}>
          <Text mb={-1} fw={500}>
            {itemIndex}
          </Text>
        </div>
      )}
      <div className={classes['card-item__children-container']}>{children}</div>
    </Paper>
  )
);

CardItem.displayName = 'CardItem';
