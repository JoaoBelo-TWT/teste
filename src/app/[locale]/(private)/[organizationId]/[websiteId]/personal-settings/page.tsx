import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { BaseCard } from '@/components/ui/base-card';
import { getMe } from '@/lib/react-query/user/query-me';

import PersonalSettingsList from './personal-settings-list';

export default async function PersonalSettingsPage() {
  const t = await getTranslations();
  const meData = await getMe();

  return (
    <Flex w="100%">
      <BaseCard headerProps={{ title: t('personal-settings.title') }}>
        <PersonalSettingsList meData={meData} />
      </BaseCard>
    </Flex>
  );
}
