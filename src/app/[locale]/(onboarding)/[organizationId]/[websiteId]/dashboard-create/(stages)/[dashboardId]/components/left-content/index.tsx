'use client';

import { Flex } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { FORM_ID } from '@/components/lists/funnel-stages-list';
import { Button } from '@/components/ui/button';
import { TextContent } from '@/components/ui/text-content';
import { SPACING } from '@/resources/constants';

export default function CreateStatesContent() {
  const t = useTranslations();
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = useCallback(() => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement;
    if (form) {
      setLoading(true);
      form.requestSubmit();
    }
  }, []);

  return (
    <Flex direction="column" p={SPACING.md} gap={SPACING.sm} align="start">
      <TextContent title={t('onboarding.funnels.title')} description={t('onboarding.funnels.text')} />
      <Button loading={loading} onClick={() => submitForm()} mt={SPACING.md}>
        {t('common.continue')}
      </Button>
    </Flex>
  );
}
