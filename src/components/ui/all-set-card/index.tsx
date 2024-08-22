import { getTranslations } from 'next-intl/server';

import { OnboardingContinueButton } from '@/app/[locale]/(onboarding)/components/onboarding-continue-button';
import { TextContent } from '@/components/ui/text-content';

import classes from './index.module.css';

export async function AllSetCard({
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
    <div className={classes['all-set-card']}>
      <div className={classes['all-set-card__image-container']}>
        <img
          width={500}
          height={250}
          src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/hand.webp`}
          className={classes['all-set-card__image']}
          alt={t('onboarding.setup.step7.imageAtl')}
        />
      </div>
      <div className={classes['all-set-card__text-container']}>
        <TextContent
          title={title ?? t('onboarding.setup.step7.title')}
          description={description ?? t('onboarding.setup.step7.description')}
        />
        {href && (
          <OnboardingContinueButton
            clearOnboardingStep={!isOnboarding}
            isOnboarding={!isOnboarding}
            text={buttonText ?? t('onboarding.setup.step7.getStarted')}
            href={href}
          />
        )}
      </div>
    </div>
  );
}
