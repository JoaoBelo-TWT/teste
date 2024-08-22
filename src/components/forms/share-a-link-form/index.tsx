'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr/X';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm, useFieldArray, FieldError } from 'react-hook-form';

import { ModalButtons } from '@/components/modals/modal-buttons';
import { IconButton } from '@/components/navigation/icon-button';
import { Button } from '@/components/ui/button';
import { TextAreaInput } from '@/components/ui/text-area';
import { TextInput } from '@/components/ui/text-input';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { RequestShareALink } from './action';
import { ShareALinkFormData, ShareALinkSchema } from './schemas';

type ModalData = {
  url: string;
};

export function ShareALinkForm() {
  const t = useTranslations();
  const { destroyModal, data } = useModal<ModalData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultInput = {
    assignTo: '',
    email: '',
    message: t('modals.shareALink.defaultMessage', { htmlTag: '</head>' })
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ShareALinkFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(ShareALinkSchema(t)),
    defaultValues: {
      recipients: [defaultInput]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recipients'
  });

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    setIsLoading(true);
    const response = await RequestShareALink({ recipients: formData.recipients, url: data.url });
    setIsLoading(false);
    showResponseToast({ response, showSuccessMessages: true });
    destroyModal();
  });

  return (
    <form action={formAction}>
      {fields.map((field, index) => (
        <Box key={`${index}+${field.id}`} pt={SPACING.md}>
          {fields.length > 1 && (
            <Flex mt={SPACING.lg} justify="flex-end">
              <IconButton onClick={() => remove(index)}>
                <X />
              </IconButton>
            </Flex>
          )}
          <Flex w="100%" mb={SPACING.md} mt={fields.length === 1 ? SPACING.lg : 0}>
            <TextInput
              {...register(`recipients.${index}.assignTo` as const)}
              flex="1"
              label={t('modals.shareALink.assignTo')}
              placeholder={t('modals.shareALink.assignToPlaceHolder')}
              error={errors.recipients?.[index]?.assignTo?.message}
            />
            <TextInput
              {...register(`recipients.${index}.email` as const)}
              flex="1"
              label={t('modals.shareALink.email')}
              placeholder={t('modals.shareALink.emailPlaceHolder')}
              ml={-1}
              error={errors.recipients?.[index]?.email?.message}
            />
          </Flex>

          <TextAreaInput
            {...register(`recipients.${index}.message` as const)}
            label={t('modals.shareALink.message')}
            mb={SPACING.md}
            error={(errors.recipients?.[index]?.message as FieldError)?.message}
          />
        </Box>
      ))}
      <Button type="button" onClick={() => append(defaultInput)} mb={SPACING.xxl} variant="light">
        + {t('modals.shareALink.addAnotherRecipient')}
      </Button>
      <ModalButtons
        buttons={[
          {
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel')
          },
          {
            variant: BUTTON_VARIANT.FILLED,
            type: 'submit',
            children: t('modals.shareALink.submit'),
            loading: isLoading
          }
        ]}
      />
    </form>
  );
}
