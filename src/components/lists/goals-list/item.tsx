import { Text } from '@mantine/core';

import classes from './index.module.css';
import { ItemProps } from './types';

export function Item({ title, description, children, hideChildren }: Readonly<ItemProps>) {
  return (
    <div className={classes['goals-list__item']}>
      <div>
        <Text c="dark.9" fz="body2" lh="body2" mb={3}>
          {title}
        </Text>
        <Text c="dark.5" fz="body2" lh="body2">
          {description}
        </Text>
      </div>
      {!hideChildren && children}
    </div>
  );
}
