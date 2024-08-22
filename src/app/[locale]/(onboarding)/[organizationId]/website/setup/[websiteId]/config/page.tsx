import { getTranslations } from 'next-intl/server';

import { LogoutButton } from '@/components/navigation/logout-button';
import { WebsiteSetupCard } from '@/components/sections/website-setup-card';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { fetchMeData } from '@/lib/fetch-me-data';

import { WebsiteCreateCloseButton } from '../../components/close-button';

export default async function ConfigPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations();
  const user = await fetchMeData();
  const isOnboarding = !!user.me.currentOnboardingPath;
  const steps = [
    { label: t('onboarding.setup.step2.stepper') },
    { label: t('onboarding.setup.step3.stepper') },
    { label: t('onboarding.setup.step4.stepper') },
    { label: t('onboarding.setup.step5.stepper') },
    { label: t('onboarding.setup.step6.stepper') }
  ];
  return (
    <ProgressContainer
      padded
      steps={steps}
      activeStep={3}
      rightHeaderContent={user.me.currentOnboardingPath ? <LogoutButton /> : <WebsiteCreateCloseButton />}
    >
      <WebsiteSetupCard
        websiteId={params.websiteId}
        organizationId={params?.organizationId}
        onboarding={isOnboarding}
      />
    </ProgressContainer>
  );
}
