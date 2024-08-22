import { Flex, FlexProps } from '@mantine/core';
import { ReactNode } from 'react';

import { MAX_WIDTH, SPACING } from '@/resources/constants';

export interface ContainerProps extends FlexProps {
  children: ReactNode;
  header?: ReactNode;
  fullWidth?: boolean;
  mih?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    /* eslint-disable i18next/no-literal-string */
    <Flex
      maw={props.fullWidth ? undefined : MAX_WIDTH}
      mih={props.mih || '100vh'}
      mr="auto"
      ml="auto"
      align="center"
      justify="center"
      px={SPACING.sm}
      {...props}
    >
      {props.children}
    </Flex>
  );
}
