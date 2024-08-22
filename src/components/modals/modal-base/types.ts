import { ModalProps as MantineModalProps } from '@mantine/core';

export type ModalProps = {
  children?: React.ReactNode;
  title?: string;
} & MantineModalProps;
