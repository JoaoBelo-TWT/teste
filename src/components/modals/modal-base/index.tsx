'use client';

import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { X } from '@phosphor-icons/react/dist/ssr';

import { IconButton } from '@/components/ui/icon-button';

import { ModalHeader } from '../modal-header';

import classes from './index.module.css';
import { ModalProps } from './types';

export function ModalBase({ children, title, onClose, ...rest }: Readonly<ModalProps>) {
  const isMobile = useMediaQuery('(max-width: 52em)', true, {
    getInitialValueInEffect: false
  });

  return (
    <Modal
      mah={'100%'}
      maw={'100%'}
      miw={300}
      size="auto"
      radius={24}
      classNames={{
        root: classes['modal-base__root']
      }}
      withCloseButton={false}
      padding={0}
      centered={true}
      transitionProps={{ transition: 'fade', duration: 100 }}
      fullScreen={isMobile}
      closeButtonProps={{
        icon: (
          <IconButton variant="outline" radius={100} size={44}>
            <X size={16} />
          </IconButton>
        )
      }}
      onClose={onClose}
      {...rest}
    >
      <div className={classes['modal-base__child-wrapper']}>
        {title && onClose && <ModalHeader title={title} close={onClose} />}
        {children}
      </div>
    </Modal>
  );
}
