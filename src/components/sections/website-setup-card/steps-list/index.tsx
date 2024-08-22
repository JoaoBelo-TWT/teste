'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { Box } from '@mantine/core';
import { CheckCircle } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { OnboardingContinueButton } from '@/app/[locale]/(onboarding)/components/onboarding-continue-button';
import { StepItem } from '@/components/ui/steps-list-item/item';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { buildPixelUrl } from '@/utils/pixel';

import classes from './index.module.css';
import { WebsiteConnectionCheck } from './website-connection-check';

export function StepsList({
  websiteId,
  hideContinueButton,
  organizationId,
  websiteName,
  onboarding,
  redirectToConnectionsPage
}: Readonly<{
  websiteId: string;
  hideContinueButton?: boolean;
  websiteName?: string;
  organizationId?: string;
  onboarding?: boolean;
  redirectToConnectionsPage?: boolean;
}>) {
  const t = useTranslations();
  const [isWebsiteConnected, setIsWebsiteConnected] = useState<boolean | undefined>(undefined);

  const steps = useMemo(
    () => [
      {
        step: '1',
        description: t('onboarding.setup.step6.instructions.selfHosted.1')
      },
      {
        step: '2',
        description: t('onboarding.setup.step6.instructions.selfHosted.2', { htmlTag: '<header></header>' })
      },
      {
        step: '3',
        description: t('onboarding.setup.step6.instructions.selfHosted.3'),
        endContent: (
          <Box maw={500} className={classes['steps-list__copy-container']}>
            <CodeHighlight maw={500} w="100%" code={buildPixelUrl(websiteId)} />
          </Box>
        )
      },
      {
        step: '4',
        description: (
          <WebsiteConnectionCheck
            websiteId={websiteId}
            onWebsiteCheck={setIsWebsiteConnected}
            website={websiteName}
            title={t('onboarding.setup.step6.instructions.selfHosted.4')}
            tooltip={t('onboarding.setup.step6.instructions.selfHosted.5')}
          />
        )
      }
    ],
    [t, websiteId, websiteName, setIsWebsiteConnected]
  );

  const options = steps.map(({ step, description, endContent }, index) => (
    <StepItem
      key={step}
      description={description}
      stepNumber={step}
      endContent={endContent}
      noBorder={index + 3 > steps.length}
    />
  ));

  const renderOnboardButton = useMemo(() => {
    if (!hideContinueButton && organizationId) {
      return (
        <OnboardingContinueButton
          mt={SPACING.md}
          isOnboarding={onboarding}
          startIcon={isWebsiteConnected ? <CheckCircle size={SPACING.sm} /> : undefined}
          text={
            isWebsiteConnected ? t('onboarding.setup.continueButtonComplete') : t('onboarding.setup.continueTestLater')
          }
          href={
            redirectToConnectionsPage
              ? routes.website.connections.path(organizationId, websiteId)
              : routes.website.setup.allSet.path(organizationId, websiteId)
          }
        />
      );
    }
    return null;
  }, [hideContinueButton, isWebsiteConnected, t, websiteId, onboarding, organizationId, redirectToConnectionsPage]);

  return (
    <div className={classes['steps-list']}>
      {options}
      {renderOnboardButton}
    </div>
  );
}
