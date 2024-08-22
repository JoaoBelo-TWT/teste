import { Flex } from '@mantine/core';
import clsx from 'clsx';
import { ReactNode } from 'react';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export default function TopBarWrapper({
  children,
  endContent,
  startContent
}: Readonly<{ children: ReactNode; endContent?: ReactNode; startContent?: ReactNode }>) {
  return (
    <div className={clsx(classes['top-bar'], Boolean(startContent) && classes['top-bar--no-start-padding'])}>
      <Flex align="center" gap={SPACING.md - 4}>
        {startContent}
        {children}
      </Flex>
      {endContent}
    </div>
  );
}
