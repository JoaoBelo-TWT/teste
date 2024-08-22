import { getTranslations } from 'next-intl/server';
import { ReactElement } from 'react';

import { ProgressContainer } from '@/components/wrappers/progress-container';

export default async function CreateStagesLayout({ children }: { children: ReactElement }) {
  const t = await getTranslations();
  const steps = [
    { label: t('onboarding.dashboard.stepper') },
    { label: t('onboarding.dashboard.goals.title') },
    { label: t('onboarding.dashboard.defineFunnel.stepper') }
  ];
  return (
    <ProgressContainer padded activeStep={3} steps={steps} backToDashboard>
      {children}
    </ProgressContainer>
  );
}
