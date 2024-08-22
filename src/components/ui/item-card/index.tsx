import { AvatarProps, Paper, PaperProps } from '@mantine/core';
import { ReactNode } from 'react';

import { AvatarWithLabel } from '../avatar-label';

import classes from './index.module.css';

export interface ItemCardProps extends PaperProps {
  itemName: string | null;
  itemImage?: string | null;
  itemDescription?: string | null;
  avatarProps?: AvatarProps;
  rightContent?: ReactNode;
}

export function ItemCard({ itemName, itemImage, itemDescription, avatarProps, rightContent, ...rest }: ItemCardProps) {
  return (
    <Paper {...rest} className={classes['item-card']}>
      <AvatarWithLabel avatarProps={avatarProps} imageSrc={itemImage} description={itemDescription} label={itemName} />
      {rightContent}
    </Paper>
  );
}
