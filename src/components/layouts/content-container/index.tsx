import { Flex, FlexProps } from '@mantine/core';

import { LogoHeader } from '../../sections/logo-header';

import classes from './index.module.css';

export interface ContentContainerProps extends FlexProps {
  children: React.ReactNode;
  displayLogo?: boolean;
  noBackButton?: boolean;
  noHeader?: boolean;
}

export function ContentContainer({
  children,
  displayLogo = true,
  noBackButton = false,
  noHeader,
  ...props
}: Readonly<ContentContainerProps>) {
  return (
    <Flex className={classes['content-container']} {...props}>
      {!noHeader && <LogoHeader displayLogo={displayLogo} noBackButton={noBackButton} />}
      <div className={classes['content-container__container']}>{children}</div>
    </Flex>
  );
}
