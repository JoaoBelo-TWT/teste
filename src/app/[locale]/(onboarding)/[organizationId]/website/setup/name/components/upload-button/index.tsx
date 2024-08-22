'use client';

import { Image } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Controller, FieldValues, UseControllerProps, FieldPath } from 'react-hook-form';

import { Button } from '@/components/ui/button';

export function UploadButton<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name
}: Readonly<UseControllerProps<TFieldValues, TName>>) {
  const t = useTranslations('onboarding.setup.step2');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur } }) => (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onBlur={onBlur}
            onChange={(value) => onChange(value.target.files?.[0])}
            style={{ display: 'none' }}
          />
          <Button
            pr={24}
            pl={24}
            type="button"
            variant="light"
            size="small"
            leftSection={<Image alt={t('thumbnailImageButton')} size={16} />}
            onClick={handleClick}
          >
            {t('thumbnailImageButton')}
          </Button>
        </>
      )}
    />
  );
}
