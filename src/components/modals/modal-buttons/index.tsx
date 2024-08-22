import { ButtonProps, Flex } from '@mantine/core';
import { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';

export interface ModalButtonProps extends ButtonProps {
  onClick?: () => void;
  children: ReactElement | string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  href?: string;
}

export interface ModalButtonsProps {
  buttons: ModalButtonProps[];
}

export function ModalButtons({ buttons }: ModalButtonsProps) {
  return (
    <Flex gap={SPACING.xs} pt={SPACING.sm} pb={SPACING.sm} mt={SPACING.lg}>
      {buttons.map((button, index) => (
        <Button key={index} miw={190} size="lg" variant={button.variant ?? BUTTON_VARIANT.FILLED} {...button}>
          {button.children}
        </Button>
      ))}
    </Flex>
  );
}
