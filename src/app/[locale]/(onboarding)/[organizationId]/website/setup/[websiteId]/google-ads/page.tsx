import { getTranslations } from 'next-intl/server';

import { LogoutButton } from '@/components/navigation/logout-button';
import { GoogleAddsSetupCard } from '@/components/sections/google-adds-setup';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { getMe } from '@/lib/react-query/user/query-me';

import { WebsiteCreateCloseButton } from '../../components/close-button';

export default async function GoogleAddsConfigPageOnboarding({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations();
  const user = await getMe();

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
