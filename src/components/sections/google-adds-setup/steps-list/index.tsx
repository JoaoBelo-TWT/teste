'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { Anchor, Box, Flex, Text } from '@mantine/core';
import { Info } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { ConnectGoogleAddsForm } from '@/components/forms/connect-google-ads-form';
import { StepItem } from '@/components/ui/steps-list-item/item';
import { Tooltip } from '@/components/ui/tooltip';
import { CONNECTIONS, GOOGLE_ADS_LINKS, SPACING } from '@/resources/constants';

import classes from './index.module.css';

export function StepsList({
  websiteId,
  organizationId,
  redirectToConnectionsPage
}: Readonly<{
  websiteId: string;
  organizationId: string;
  redirectToConnectionsPage?: boolean;
}>) {
  const t = useTranslations();

  const steps = useMemo(
    () => [
      {
        step: '1',
        description: t('website.connectGoogleAdds.steps.1')
      },
      {
        step: '2',
        description: (
          <Text>
            {t('website.connectGoogleAdds.goTo')}
            <Anchor c="dark.9" underline="always" href={GOOGLE_ADS_LINKS.SECURITY_PATH} target="_blank">
              {t('website.connectGoogleAdds.securityPath')}
            </Anchor>{' '}
            {t('website.connectGoogleAdds.steps.2')}
          </Text>
        ),
        endContent: (
          <Box maw={500} className={classes['steps-list__copy-container']}>
            <CodeHighlight maw={500} w="100%" code={CONNECTIONS.GOOGLE_ADS} />
          </Box>
        )
      },
      {
        step: '3',
        description: (
          <Text>
            {t('website.connectGoogleAdds.goTo')}
            <Anchor c="dark.9" underline="always" href={GOOGLE_ADS_LINKS.USERS_PATH} target="_blank">
              {t('website.connectGoogleAdds.usersPath')}
            </Anchor>{' '}
            {t('website.connectGoogleAdds.steps.3')}
          </Text>
        ),
        endContent: (
          <Box maw={500} className={classes['steps-list__copy-container']}>
            <CodeHighlight maw={500} w="100%" code={GOOGLE_ADS_LINKS.EMAIL} />
          </Box>
        )
      },
      {
        step: '4',
        description: (
          <Flex align="center" gap={SPACING.xxs}>
            <Text>{t('website.connectGoogleAdds.steps.4')}</Text>
            <Tooltip position="bottom-end" maw={310} label={t('website.connectGoogleAdds.tooltip')}>
              <Info size={18} />
            </Tooltip>
          </Flex>
        ),
        endContent: (
          <ConnectGoogleAddsForm
            organizationId={organizationId}
            websiteId={websiteId}
            redirectToConnectionsPage={redirectToConnectionsPage}
          />
        )
      }
    ],
    [t, organizationId, websiteId, redirectToConnectionsPage]
  );

  const options = steps.map(({ step, description, endContent }, index) => (
    <StepItem
      key={step}
      description={description}
      stepNumber={step}
      endContent={endContent}
      noBorder={index + 2 > steps.length}
    />
  ));

  return <div className={classes['steps-list']}>{options}</div>;
}
