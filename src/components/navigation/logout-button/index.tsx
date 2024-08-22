'use client';

import { X } from '@phosphor-icons/react/dist/ssr/X';

import { IconButton } from '@/components/navigation/icon-button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';
import { routes } from '@/routes/routes';

export function LogoutButton({ backButtonHref }: Readonly<{ backButtonHref?: string | undefined }>) {
  const { setModal } = useModal();

  const handleConfirmLogout = () => {
    setModal(MODALS.LOGOUT);
  };

  return (
    <IconButton
      color="var(--mantine-color-dark-9)"
      size={44}
      radius={100}
      onClick={backButtonHref !== null ? handleConfirmLogout : undefined}
      href={backButtonHref}
      prefetch={backButtonHref !== routes.api.logout.path}
    >
      <X />
    </IconButton>
  );
}
