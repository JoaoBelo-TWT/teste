'use client';

import { CopyButton } from '@mantine/core';
import { Check, Copy } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export function CopyUrlSnippetButton({ value }: Readonly<{ value: string | undefined | null }>) {
  const t = useTranslations('onboarding.setup.step6');

  return (
    <CopyButton value={value ?? ''} timeout={2000}>
      {({ copy, copied }) => (
        <Tooltip w={'fit-content'} label={copied ? t('copiedTooltip') : t('copyTooltip')} withArrow position="right">
          <Button
            pl={24}
            pr={24}
            leftSection={copied ? <Check size={16} /> : <Copy size={16} />}
            size="small"
            variant="light"
            onClick={copy}
          >
            {t('copyButton')}
          </Button>
        </Tooltip>
      )}
    </CopyButton>
  );
}
