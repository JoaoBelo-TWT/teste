'use client';

import { Flex, Loader, Text, Tooltip } from '@mantine/core';
import { CheckCircle, Info, XCircle } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toast';
import { useQueryConnectionStatus } from '@/lib/react-query/website/query-connection-status';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export function WebsiteConnectionCheck({
  websiteId,
  title,
  website,
  onWebsiteCheck,
  tooltip
}: Readonly<{
  websiteId: string;
  title?: string;
  website?: string;
  tooltip?: string;
  onWebsiteCheck?: (verified?: boolean) => void;
}>) {
  const t = useTranslations();
  const { data, refetch, isLoading, isRefetching } = useQueryConnectionStatus(websiteId);
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (isRefetching || !enabled) return;
    if (data.isWebsiteConnected === true) {
      toaster.success({
        title: t('onboarding.setup.websiteConnected')
      });
    }
    if (data.isWebsiteConnected === false) {
      toaster.error({
        title: t('onboarding.setup.websiteNotConnected')
      });
    }
    onWebsiteCheck?.(data.isWebsiteConnected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.isWebsiteConnected, isRefetching, enabled]);

  const handleClick = () => {
    refetch();
    setEnabled(true);
  };

  const getCheckIcon = useMemo(() => {
    if (data.isWebsiteConnected === true) {
      return <CheckCircle size={20} color="green" />;
    }
    if (data.isWebsiteConnected === false) {
      return <XCircle size={20} color="red" />;
    }

    if (isLoading) {
      return <Loader size={20} width={1} />;
    }

    return null;
  }, [data.isWebsiteConnected, isLoading]);

  return (
    <Flex justify="space-between" align="center" w="100%" mih={44}>
      <Flex direction="column">
        <Flex align="center" gap={SPACING.xxs}>
          {title && <Text>{title}</Text>}
          {tooltip && (
            <Tooltip fz={14} p={16} position="bottom-end" fw={400} label={tooltip}>
              <Info size={SPACING.sm} />
            </Tooltip>
          )}
        </Flex>
        {website && (
          // eslint-disable-next-line i18next/no-literal-string
          <Flex gap={SPACING.xs} justify="start" align="center">
            {getCheckIcon}
            <a className={classes['steps-list__website-link']} href={website} target="_blank">
              <Text fw={500}>{website}</Text>
            </a>
          </Flex>
        )}
      </Flex>
      {!data.isWebsiteConnected && (
        <Button size="medium" variant="light" onClick={handleClick} miw={120} disabled={isLoading}>
          {isLoading ? t('onboarding.setup.testingButton') : t('onboarding.setup.testButton')}
        </Button>
      )}
    </Flex>
  );
}
