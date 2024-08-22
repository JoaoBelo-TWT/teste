'use client';

import { Stepper as MantineStepper, StepperProps as MantineStepperProps, StepperStepProps } from '@mantine/core';
import { Check } from '@phosphor-icons/react';

import classes from './index.module.css';

export interface StepperProps extends Omit<MantineStepperProps, 'children' | 'active'> {
  active?: number | undefined;
}

export function Stepper({ stepperProps, steps }: { stepperProps?: StepperProps; steps: StepperStepProps[] }) {
  const activeIndex = stepperProps?.active || 0;

  return (
    <MantineStepper
      active={activeIndex}
      size="xs"
      iconSize={22}
      classNames={{
        root: classes.stepper__root,
        step: classes.stepper__step,
        stepBody: classes.stepper__body,
        stepIcon: classes.stepper__icon,
        stepLabel: classes.stepper__label,
        separator: classes.stepper__separator
      }}
      {...stepperProps}
      color="green"
      completedIcon={<Check size={12} />}
    >
      {steps?.map((step, index) => (
        <MantineStepper.Step
          key={index}
          {...step}
          classNames={{ step: index > activeIndex ? classes['stepper__step--disabled'] : '' }}
        />
      ))}
    </MantineStepper>
  );
}
