import { Box, Divider, Flex, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { DeleteDashboardButton } from './delete-dashboard-button';
import classes from './index.module.css';

export async function DashboardDeleteSettings({ dashboardId }: { dashboardId: string }) {
  const t = await getTranslations();

  return (
    <>
      <Divider />
      <Flex className={classes['dashboard-delete-settings']}>
        <Box>
          <Text c="red.9" fw={500}>
            {t('common.deleteDashboard')}
          </Text>
          <Text maw={500} c="dark.7" className={classes['dashboard-goals-settings__description']}>
            {t('common.cantBeUndone')}
          </Text>
        </Box>
        <DeleteDashboardButton dashboardId={dashboardId} />
      </Flex>
    </>
  );
}
