'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollAreaAutosize } from '@mantine/core';
import { Plus, X } from '@phosphor-icons/react/dist/ssr';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { AccessLevel } from '@/__generated__/graphql';
import { SelectControl } from '@/components/controls/select-control';
import { ModalButtons } from '@/components/modals/modal-buttons';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { TextInput } from '@/components/ui/text-input';
import { useModal } from '@/context/modal';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { CreatePermissions } from './action';
import classes from './index.module.css';
import { InviteMembersFormData, InviteMembersSchema } from './schemas';

type EmailFieldKey = `permissions.${number}.email`;

export function InviteTeamMembersForm() {
  const t = useTranslations();
  const params = useParams<{ organizationId: string }>();
  const { destroyModal } = useModal();

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<InviteMembersFormData>({
    resolver: zodResolver(InviteMembersSchema(t)),
    defaultValues: {
      organizationId: params.organizationId,
      permissions: [{ email: '', accessLevel: AccessLevel.Read }]
    }
  });

  const watchPermissions = watch('permissions');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permissions'
  });

  const permissions = useMemo(
    () => [
      { value: AccessLevel.Read, label: t('organization-settings.permissionsOptions.viewOnly.title') },
      { value: AccessLevel.Write, label: t('organization-settings.permissionsOptions.editor.title') },
      { value: AccessLevel.Admin, label: t('organization-settings.permissionsOptions.admin.title') }
    ],
    [t]
  );

  const handleOnPaste = (
    fieldName: EmailFieldKey,
    event: React.ClipboardEvent<HTMLInputElement>,
    accessLevel: AccessLevel
  ) => {
    event.preventDefault();

    const pastedText = event.clipboardData.getData('text');
    const emailList = pastedText.split(/[ ,;]/).filter((email) => email.trim() !== '');

    if (emailList.length) {
      const [firstEmail, ...remainingEmails] = emailList;

      setValue(fieldName, firstEmail);

      remainingEmails.forEach((email) => {
        append({ email, accessLevel });
      });
    }
  };

  const onSubmit: () => Promise<void> = handleSubmit(async (data) => {
    const response = await CreatePermissions(data);
    if (response.successMessage) {
      showResponseToast({ response, showSuccessMessages: true });
      destroyModal();
    }

    showResponseToast({ response });
  });

  return (
    <form action={onSubmit} className={classes['invite-team-members-form']}>
      <ScrollAreaAutosize mah={{ base: '100%', m: 280 }} w="100%">
        {fields.map((item, index) => {
          const fieldName: EmailFieldKey = `permissions.${index}.email`;

          return (
            <div key={item.id} className={classes['invite-team-members-form__row']}>
              <TextInput
                placeholder={t('organization-settings.emailPlaceholder')}
                w={{ base: 'auto', m: 356 }}
                label={t('organization-settings.emailLabel')}
                error={errors.permissions?.[index]?.email?.message}
                {...register(fieldName)}
                onPaste={(e) => handleOnPaste(fieldName, e, watchPermissions?.[index]?.accessLevel)}
              />
              <SelectControl
                data={permissions}
                w={{ default: 'auto', m: 232 }}
                label={t('organization-settings.permissionsLabel')}
                error={errors.permissions?.[index]?.accessLevel?.message}
                control={control}
                name={`permissions.${index}.accessLevel`}
              />
              {fields.length > 1 && (
                <div className={classes['invite-team-members-form__delete-button']}>
                  <IconButton w={40} h={'100%'} variant="transparent" onClick={() => remove(index)}>
                    <X size={16} />
                  </IconButton>
                </div>
              )}
            </div>
          );
        })}
      </ScrollAreaAutosize>
      <Button
        variant="outline"
        size="medium"
        leftSection={<Plus size={16} />}
        onClick={() => append({ email: '', accessLevel: AccessLevel.Read })}
      >
        {t('organization-settings.addTeamMember')}
      </Button>
      <ModalButtons
        buttons={[
          {
            variant: 'outline',
            onClick: () => destroyModal(),
            children: t('common.cancel')
          },
          {
            variant: 'filled',
            children: t('organization-settings.sendInvite'),
            type: 'submit',
            disabled: watchPermissions?.[0]?.email === '',
            loading: isSubmitting
          }
        ]}
      />
    </form>
  );
}
