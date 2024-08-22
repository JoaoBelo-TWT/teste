'use client';

import { Flex, FlexProps, Text, FocusTrap, TextInput } from '@mantine/core';
import { ImageSquare, PencilSimple } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { IconButton } from '@/components/navigation/icon-button';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import FileButton from '@/components/ui/file-button';
import { toaster } from '@/components/ui/toast';
import { MAX_IMAGE_SIZE_MB, SPACING } from '@/resources/constants';
import { getImageSize } from '@/utils/get-image-size';
import { getStringAcronym } from '@/utils/strings/get-string-acronym';

import classes from './index.module.css';

export interface EditableDetailProps {
  label?: string;
  value?: string | null;
  onSave?: (value: string) => Promise<void>;
  isEditing?: boolean;
  type?: string;
}
export interface EditableDetailsListProps extends FlexProps {
  details: EditableDetailProps[];
  captureUpdatedDetails?: (details: EditableDetailProps[]) => void;
  viewOnly?: boolean;
}

export default function EditableDetailsList({ details, viewOnly, ...rest }: Readonly<EditableDetailsListProps>) {
  const [detailsState, setDetailsState] = useState<boolean[]>(details.map(() => false));
  const [inputValues, setInputValues] = useState<(string | null)[]>(details.map((detail) => detail?.value ?? null));
  const t = useTranslations();
  const showEditButton = useCallback(
    (detail: EditableDetailProps, index: number) => detail.onSave && !detailsState[index] && !viewOnly,
    [viewOnly, detailsState]
  );

  const toggleEditing = useCallback(
    (index: number) => {
      setDetailsState((prevDetailsState) => {
        const newDetailsState = [...prevDetailsState];
        newDetailsState[index] = !newDetailsState[index];
        return newDetailsState;
      });
    },
    [setDetailsState]
  );

  const handleInputChange = useCallback(
    (index: number, value: string | null) => {
      // check if image is larger then 2 mb
      if (value && getImageSize(value) > MAX_IMAGE_SIZE_MB) {
        toaster.error({ title: t('validation.imageTooBig') });
        return null;
      }

      setInputValues((prevInputValues) => {
        const newInputValues = [...prevInputValues];
        newInputValues[index] = value;
        return newInputValues;
      });

      return null;
    },
    [setInputValues, t]
  );

  const handleSave = useCallback(
    (index: number) => {
      toggleEditing(index);

      const onSaveFunction = details[index]?.onSave;
      if (onSaveFunction) {
        onSaveFunction(inputValues[index] ?? '');
      }
    },
    [toggleEditing, details, inputValues]
  );

  const handleCancel = useCallback(
    (index: number) => {
      toggleEditing(index);
      handleInputChange(index, details[index]?.value ?? null);
    },
    [toggleEditing, details, handleInputChange]
  );

  const renderImage = useCallback((src?: null | string) => {
    if (src) {
      return (
        <img
          className={classes['editable-details__detail-image']}
          alt="Organization Image"
          height={80}
          width={80}
          src={src}
        />
      );
    }

    return (
      <Avatar className={classes['editable-details__detail-image']} variant="light" radius="sm" size={80}>
        <ImageSquare size={30} />
      </Avatar>
    );
  }, []);

  const renderAvatar = useCallback(
    (value?: null | string) => (
      <Avatar
        size="xl"
        className={classes['editable-details__detail-image']}
        variant="light"
        radius="sm"
        bg="var(--flat-orange-color)"
      >
        <Text fw={500} size="50px">
          {value && getStringAcronym({ value })}
        </Text>
      </Avatar>
    ),
    []
  );

  const renderValue = useCallback(
    (value?: string | null, type?: string) => {
      if (type === 'image') {
        return renderImage(value);
      }
      if (type === 'avatar') {
        return renderAvatar(value);
      }
      return <Text>{value}</Text>;
    },
    [renderImage, renderAvatar]
  );

  const renderInput = useCallback(
    (index: number, value?: string | null, type?: string) => {
      if (type === 'image') {
        return (
          <Flex gap={SPACING.md} align="center">
            {renderImage(value)}
            <FileButton
              clearButtonLabel={`${t('common.remove')} ${t('common.image')}`}
              setValue={(image: string | null) => handleInputChange(index, image)}
            >{`${t('common.upload')} ${t('common.image')}`}</FileButton>
          </Flex>
        );
      }
      return (
        <FocusTrap active={true}>
          <TextInput
            defaultValue={value as string | undefined}
            w="100%"
            size="md"
            className={classes['editable-details__input']}
            flex={1}
            variant="unstyled"
            onChange={(event) => handleInputChange(index, event.currentTarget.value)}
            placeholder={value ?? undefined}
          />
        </FocusTrap>
      );
    },
    [handleInputChange, renderImage, t]
  );

  return (
    <Flex className={classes['editable-details']} direction="column" {...rest}>
      {details.map((detail, index) => (
        <Flex key={index} className={classes['editable-details__detail']}>
          {detail.label && (
            <Text miw={365} ml={SPACING.sm}>
              {detail.label}
            </Text>
          )}
          <Flex justify="space-between" className={classes['editable-details__input-container']}>
            {detailsState[index]
              ? renderInput(index, inputValues[index], detail.type)
              : renderValue(inputValues[index], detail.type)}
            {showEditButton(detail, index) && (
              <IconButton
                tooltip={t('common.edit')}
                variant="white"
                color="dark.9"
                onClick={() => toggleEditing(index)}
              >
                <PencilSimple className={classes['editable-details__pencil']} size={SPACING.md} />
              </IconButton>
            )}
            {detailsState[index] && (
              <Flex gap={12}>
                <Button onClick={() => handleCancel(index)} size="sm" variant="outline">
                  {t('common.cancel')}
                </Button>
                <Button onClick={() => handleSave(index)} size="sm">
                  {t('common.save')}
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
