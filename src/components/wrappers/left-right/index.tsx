/* eslint-disable i18next/no-literal-string */
import { Flex, FlexProps, SimpleGridProps } from '@mantine/core';
import { ReactElement } from 'react';

import { Grid } from '@/components/layouts/grid';
import { SPACING } from '@/resources/constants';

export function LeftRightWrapper({
  leftContent,
  rightContent,
  minHeight,
  gridProps,
  leftFlexProps,
  rightFlexProps
}: Readonly<{
  leftContent: ReactElement;
  rightContent: ReactElement;
  minHeight?: string;
  gridProps?: SimpleGridProps;
  rightFlexProps?: FlexProps;
  leftFlexProps?: FlexProps;
}>) {
  return (
    <Grid
      w="100%"
      h="100%"
      mih={minHeight || undefined}
      cols={{ base: 1, md: 2 }}
      spacing={{ base: SPACING.md, md: 100, lg: 200 }}
      {...gridProps}
    >
      <Flex
        w="100%"
        direction="column"
        justify={{ base: 'center', md: 'center' }}
        align={{ base: 'center', md: 'center' }}
        maw={leftFlexProps?.maw ?? 535}
        ml={{ base: 'auto', md: 'auto' }}
        mr={{ base: 'auto', md: 0 }}
        {...leftFlexProps}
      >
        {leftContent}
      </Flex>
      <Flex
        w="100%"
        direction="column"
        justify={{ base: 'center', md: 'center' }}
        align="center"
        maw={rightFlexProps?.maw ?? 535}
        mr={{ base: 'auto', md: 'auto' }}
        ml={{ base: 'auto', md: 0 }}
        {...rightFlexProps}
      >
        {rightContent}
      </Flex>
    </Grid>
  );
}
