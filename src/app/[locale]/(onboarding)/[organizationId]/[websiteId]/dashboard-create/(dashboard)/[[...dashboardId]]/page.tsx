import { getTranslations } from 'next-intl/server';

import { TextContent } from '@/components/ui/text-content';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { getMe } from '@/lib/react-query/user/query-me';
import { OnboardingQueryParamsProps } from '@/types/constants/onboarding-query-params';

import { OnboardingImage } from '../components/image';

import { CreateDashboardForm } from './components/create-dashboard';
import classes from './index.module.css';

export default async function CreateDashboardPage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; dashboardId: string[]; websiteId: string };
  searchParams: OnboardingQueryParamsProps;
}>) {
  const t = await getTranslations();
  const user = await getMe();
  const isOnboarding = !!user.me.currentOnboardingPath;

  const steps = [
    { label: t('onboarding.dashboard.stepper') },
    { label: t('onboarding.dashboard.goals.title') },
    { label: t('onboarding.dashboard.defineFunnel.stepper') }
  ];
  /* eslint-disable i18next/no-literal-string */
  return (
    <ProgressContainer activeStep={0} steps={steps} flexProps={{ align: 'stretch' }} backToDashboard>
      <LeftRightWrapper
        gridProps={{ mih: 'auto', h: 'auto' }}
        rightFlexProps={{ maw: 'auto' }}
        leftContent={
          <div className={classes['dashboard-create__container']}>
            <div className={classes['dashboard-create__container--content']}>
              <TextContent title={t('onboarding.dashboard.title')} description={t('onboarding.dashboard.text')} />
              <CreateDashboardForm
                organizationId={params.organizationId}
                websiteId={params.websiteId}
                flow={searchParams.flow}
                isOnboarding={isOnboarding}
              />
            </div>
          </div>
        }
        rightContent={<OnboardingImage />}
      />
    </ProgressContainer>
  );
}
