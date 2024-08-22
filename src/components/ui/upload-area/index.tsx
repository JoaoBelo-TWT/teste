'use client';

import { Text, Group, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UploadSimple, X, ImageSquare } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import classes from './index.module.css';

interface UploadAreaProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>;
  name: TName;
  selectedImageFile: File | null;
  dropzoneAcceptText?: string;
  dropzoneRejectText?: string;
  dropzoneIdleText?: string;
  description?: string;
}

export function UploadArea<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  selectedImageFile,
  dropzoneAcceptText,
  dropzoneRejectText,
  dropzoneIdleText,
  description
}: Readonly<UploadAreaProps<TFieldValues, TName>>) {
  const openRef = useRef(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const t = useTranslations();

  useEffect(() => {
    if (window && selectedImageFile !== null) {
      setImageUrl(window.URL.createObjectURL(selectedImageFile));
    }
  }, [selectedImageFile]);

  const defaultDescription = useMemo(
    () =>
      imageUrl
        ? t('onboarding.setup.step2.dropzone.descriptionReplace')
        : t('onboarding.setup.step2.dropzone.description'),
    [imageUrl, t]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Dropzone
          className={classes['upload-area']}
          openRef={openRef}
          onDrop={(files) => onChange(files?.[0])}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          maxSize={5 * 1024 ** 2}
        >
          <div className={classes['upload-area__container']}>
            <Group justify="center" className={classes['upload-area__image-container']}>
              <Dropzone.Accept>
                <UploadSimple width={1} style={{ width: rem(30), height: rem(30) }} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <X width={1} style={{ width: rem(30), height: rem(30) }} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                {imageUrl ? (
                  <img
                    className={classes['upload-area__image-preview']}
                    src={imageUrl}
                    alt={'image preview'}
                    width={50}
                    height={50}
                  />
                ) : (
                  <ImageSquare width={1} style={{ width: rem(30), height: rem(30) }} />
                )}
              </Dropzone.Idle>
            </Group>
            <div className={classes['upload-area__text-container']}>
              <Text fz="header5">
                <Dropzone.Accept>{dropzoneAcceptText ?? t('onboarding.setup.step2.dropzone.accept')}</Dropzone.Accept>
                <Dropzone.Reject>{dropzoneRejectText ?? t('onboarding.setup.step2.dropzone.reject')}</Dropzone.Reject>
                <Dropzone.Idle>{dropzoneIdleText ?? t('onboarding.setup.step2.dropzone.idle')}</Dropzone.Idle>
              </Text>
              <Text size="sm" c="dimmed">
                {description ?? defaultDescription}
              </Text>
            </div>
          </div>
        </Dropzone>
      )}
    />
  );
}
