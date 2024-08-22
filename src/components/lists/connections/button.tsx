'use client';

import { Box } from '@mantine/core';
import { useTranslations } from 'next-intl';

import {
  GoogleAdsIntegrationStatus,
  HubspotIntegrationStatus,
  MetaAdsIntegrationStatus,
  SalesforceIntegrationStatus
} from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { ConnectionStatus } from '@/types/connection';

import { ConnectButtonProps } from './types';

export function ConnectButton({ connection, ...props }: ConnectButtonProps) {
  const t = useTranslations();

  const getConnectButtonText = (
    status?:
      | ConnectionStatus
      | HubspotIntegrationStatus
      | SalesforceIntegrationStatus
      | MetaAdsIntegrationStatus
      | GoogleAdsIntegrationStatus
      | null
  ): string => {
    if (status) {
      return t(`website.connections.connectButton.${status}`);
    }

    return t(`website.connections.connectButton.DISABLED`);
  };

  const buttonContent = (
    <Button
      href={connection.href ? connection.href : undefined}
      disabled={connection.loading || connection.disabled || props.disabled}
      loading={connection.loading || props.loading}
      onClick={connection.onClick}
      size="sm"
      variant={connection.status === ConnectionStatus.Active ? 'light' : 'filled'}
      {...props}
    >
      {getConnectButtonText(connection.status)}
    </Button>
  );

  if (connection.tooltip) {
    return (
      <Tooltip w={310} label={connection.tooltip}>
        <Box>{buttonContent}</Box>
      </Tooltip>
    );
  }

  return buttonContent;
}
