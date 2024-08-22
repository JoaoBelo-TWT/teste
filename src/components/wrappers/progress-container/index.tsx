import { Box, Flex, FlexProps, StepperStepProps } from '@mantine/core';
import clsx from 'clsx';
import { ReactElement } from 'react';

import { LogoHeader } from '@/components/sections/logo-header';
import { ContainerProps } from '@/components/ui/container';
import { Stepper } from '@/components/ui/stepper';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

interface ProgressContainerProps extends ContainerProps {
  steps?: StepperStepProps[];
  activeStep?: number;
  flexProps?: FlexProps;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  backToDashboard?: boolean;
  leftHeaderContent?: ReactElement;
  rightHeaderContent?: ReactElement;
  padded?: boolean;
}

export function ProgressContainer(props: Readonly<ProgressContainerProps>) {
  return (
    <Box className={classes['progress-container']}>
      <div className={classes['progress-container__wrapper']}>
        <LogoHeader
          displayLogo
          backButtonAction={props.onBackClick}
          closeButtonAction={props.onCloseClick}
          backToDashboard={props.backToDashboard}
          leftContent={props.leftHeaderContent}
          rightContent={props.rightHeaderContent}
        />
        {props?.steps && (
          <Stepper steps={props.steps} stepperProps={{ mb: SPACING.md, mt: SPACING.sm, active: props?.activeStep }} />
        )}
        <Flex
          className={clsx(
            classes['progress-container__content-container'],
            props.padded && classes['progress-container__content-container--padded']
          )}
          {...props.flexProps}
        >
          {props.children}
        </Flex>
      </div>
    </Box>
  );
}
