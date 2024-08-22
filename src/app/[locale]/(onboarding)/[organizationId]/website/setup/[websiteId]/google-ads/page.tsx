import { getTranslations } from 'next-intl/server';

import { LogoutButton } from '@/components/navigation/logout-button';
import { GoogleAddsSetupCard } from '@/components/sections/google-adds-setup';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { fetchMeData } from '@/lib/fetch-me-data';

import { WebsiteCreateCloseButton } from '../../components/close-button';

export default async function GoogleAddsConfigPageOnboarding({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations();
  const user = await fetchMeData();

  const steps = [
    { label: t('onboarding.setup.step2.stepper') },
    { label: t('onboarding.setup.step3.stepper') },
    { label: t('onboarding.setup.step4.stepper') },
    { label: t('onboarding.setup.step5.stepper') },
    { label: t('onboarding.setup.step6.stepper') }
  ];
  return (
    <ProgressContainer
      steps={steps}
      activeStep={5}
      rightHeaderContent={user.me.currentOnboardingPath ? <LogoutButton /> : <WebsiteCreateCloseButton />}
    >
      <GoogleAddsSetupCard websiteId={params.websiteId} organizationId={params?.organizationId} />
    </ProgressContainer>
  );
}
