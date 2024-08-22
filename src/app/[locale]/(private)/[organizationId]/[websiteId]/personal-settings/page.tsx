import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { BaseCard } from '@/components/ui/base-card';
import { fetchMeData } from '@/lib/fetch-me-data';

import PersonalSettingsList from './personal-settings-list';

export default async function PersonalSettingsPage() {
  const t = await getTranslations();
  const meData = await fetchMeData();

  return (
    <Flex w="100%">
      <BaseCard headerProps={{ title: t('personal-settings.title') }}>
        <PersonalSettingsList meData={meData} />
      </BaseCard>
    </Flex>
  );
}
