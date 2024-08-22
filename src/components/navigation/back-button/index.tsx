'use client';

import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';

export function BackButton({
  route,
  extraOnClickAction,
  children
}: Readonly<{ route?: string; extraOnClickAction?: () => void; children?: React.ReactElement | string }>) {
  const router = useRouter();

  const backAction = useCallback(() => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
    if (extraOnClickAction) {
      extraOnClickAction();
    }
  }, [route, extraOnClickAction, router]);

  if (children) return <Button onClick={backAction}>{children}</Button>;

  return (
    <IconButton color="var(--mantine-color-dark-9)" radius={100} size={44} onClick={backAction}>
      <ArrowLeft size={16} />
    </IconButton>
  );
}
