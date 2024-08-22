import { Box, Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { OnboardingContinueButton } from '@/app/[locale]/(onboarding)/components/onboarding-continue-button';
import { TextContent } from '@/components/ui/text-content';
import { COLORS } from '@/resources/constants';

import classes from './index.module.css';

export async function AllSetCardHorizontal({
  title,
  description,
  buttonText,
  href,
  isOnboarding = false
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
  isOnboarding?: boolean;
}) {
  const t = await getTranslations();
  return (
    <Flex direction="row" className={classes['all-set-card-horizontal']}>
      <Box w={180} h={180} className={classes['all-set-card-horizontal__image-container']}>
        <img
          width={184}
          height={184}
          src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/hand.webp`}
          className={classes['all-set-card-horizontal__image']}
          alt={t('onboarding.setup.step7.imageAtl')}
        />
      </Box>
      <Flex className={classes['all-set-card-horizontal__text-container']}>
        <TextContent
          mb={-12}
          title={title ?? t('onboarding.setup.step7.title')}
          description={description ?? t('onboarding.setup.step7.description')}
        />
        {href && (
          <OnboardingContinueButton
            clearOnboardingStep={!isOnboarding}
            isOnboarding={!isOnboarding}
            text={buttonText ?? t('onboarding.setup.step7.getStarted')}
            href={href}
            /* eslint-disable i18next/no-literal-string */
            buttonProps={{ c: 'white', bg: COLORS.systemGreen600, fw: 500, fz: 'body1' }}
          />
        )}
      </Flex>
    </Flex>
  );
}
