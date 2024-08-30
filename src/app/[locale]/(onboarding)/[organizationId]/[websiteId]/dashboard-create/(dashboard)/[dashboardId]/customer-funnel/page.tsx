import { Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { OnboardingContinueButton } from '@/app/[locale]/(onboarding)/components/onboarding-continue-button';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { getMe } from '@/lib/react-query/user/query-me';
import { routes } from '@/routes/routes';
import { OnboardingQueryParamsProps } from '@/types/constants/onboarding-query-params';

import { OnboardingImage } from '../../components/image';

import classes from './index.module.css';

export default async function DefineFunnelPage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string };
  searchParams: OnboardingQueryParamsProps;
}>) {
  const t = await getTranslations();
  const { flow } = searchParams;
  const user = await getMe();
  const isOnboarding = !!user.me.currentOnboardingPath;

  const steps = [
    { label: t('onboarding.dashboard.stepper') },
    { label: t('onboarding.dashboard.goals.title') },
    { label: t('onboarding.dashboard.defineFunnel.stepper') }
  ];
  /* eslint-disable i18next/no-literal-string */
  return (
    <ProgressContainer activeStep={2} steps={steps} flexProps={{ align: 'stretch' }} backToDashboard>
      <LeftRightWrapper
        gridProps={{ mih: 'auto', h: 'auto' }}
        rightFlexProps={{ maw: 'auto' }}
        leftContent={
          <div className={classes['customer-funnel__container']}>
            <div className={classes['customer-funnel__title-container']}>
              <Title order={2}>{t('onboarding.dashboard.defineFunnel.title')}</Title>
              <div className={classes['customer-funnel__description-container']}>
                <Text fz="body1" lh="body2">
                  {t('onboarding.dashboard.defineFunnel.text1')}
                </Text>
                <Text fz="body1" lh="body2">
                  {t('onboarding.dashboard.defineFunnel.text2')}
                </Text>
              </div>
            </div>
            <div className={classes['customer-funnel__buttons-container']}>
              <OnboardingContinueButton
                isOnboarding={isOnboarding}
                text={t('common.continue')}
                clearOnboardingStep={isOnboarding}
                href={routes.dashboard.dashboardCreate.selectSource.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId,
                  flow
                )}
              />
              <OnboardingContinueButton
                isOnboarding={isOnboarding}
                variant="transparent"
                text={t('common.skipForNow')}
                clearOnboardingStep
                href={routes.dashboard.homePage.path(params.organizationId, params.websiteId, params.dashboardId)}
              />
            </div>
          </div>
        }
        rightContent={<OnboardingImage />}
      />
    </ProgressContainer>
  );
}
