'use client';

import { Flex, FlexProps, Skeleton } from '@mantine/core';
import { PencilSimple } from '@phosphor-icons/react';

import { IconButton } from '@/components/navigation/icon-button';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export interface EditableDetailProps {
  label?: string;
  value?: string | null;
  onSave?: (value: string) => Promise<void>;
  isEditing?: boolean;
  type?: string;
}
export interface DetailItemLoadingProps extends FlexProps {
  showLabel?: boolean;
}

export default function DetailItemLoading({ showLabel }: DetailItemLoadingProps) {
  return (
    <Flex direction="column">
      <Flex className={classes['editable-details__detail']} justify="space-between">
        <Skeleton width={200} h={25} />
        {showLabel && <Skeleton width={200} h={25} />}
        <Flex>
          <IconButton variant="white" color="dark.9" loading>
            <PencilSimple size={SPACING.md} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
}
