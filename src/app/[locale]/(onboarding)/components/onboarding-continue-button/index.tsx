'use client';

import { ButtonProps } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ReactElement, useState } from 'react';

import { Button } from '@/components/ui/button';

import { saveCurrentOnboardingPath } from '../../actions/save-current-onboarding-path';

type OnboardingContinueButtonProps = ButtonProps & {
  text: string;
  href: string;
  startIcon?: ReactElement;
  clearOnboardingStep?: boolean;
  isOnboarding?: boolean;
  error?: boolean;
  buttonProps?: ButtonProps;
};

export function OnboardingContinueButton(props: Readonly<OnboardingContinueButtonProps>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOnboarding, clearOnboardingStep, startIcon, ...restProps } = props;

  const handleClick = () => {
    setIsLoading(true);
    if (isOnboarding) {
      saveCurrentOnboardingPath(clearOnboardingStep ? null : props.href).then(() => {
        router.push(props.href);
      });
    } else {
      router.push(props.href);
    }
  };

  return (
    <Button
      leftSection={startIcon}
      loading={isLoading}
      variant="filled"
      size="md"
      onClick={handleClick}
      {...restProps}
      {...props.buttonProps}
      href={undefined}
    >
      {props.text}
    </Button>
  );
}
