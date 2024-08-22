'use client';

import { Text, Button } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { Cross } from '@phosphor-icons/react';

export const TestModal = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      <Cross size={16} />
    </Button>
  </>
);
