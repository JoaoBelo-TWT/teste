'use client';

import { Flex } from '@mantine/core';
import { X } from '@phosphor-icons/react';

import { Header } from '@/components/ui/header';
import { IconButton } from '@/components/ui/icon-button';
import { useModal } from '@/context/modal';
import { SPACING } from '@/resources/constants';

export function ModalHeader({
  title,
  close,
  showCloseButton = true
}: Readonly<{
  title: string;
  close?: () => void;
  showCloseButton?: boolean;
}>) {
  const { destroyModal } = useModal();
  return (
    <Flex direction="row" gap={SPACING.xxl} align="center" mb={SPACING.sm}>
      <Header title={title} titleProps={{ c: 'dark.8' }} />
      {showCloseButton && (
        <IconButton
          style={{
            color: 'var(--mantine-color-dark-9)',
            borderColor: 'var(--mantine-color-dark-9)'
          }}
          variant="outline"
          radius={100}
          size={44}
          onClick={close ?? destroyModal}
        >
          <X size={16} />
        </IconButton>
      )}
    </Flex>
  );
}
