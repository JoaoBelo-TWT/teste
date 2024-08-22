'use client';

import { Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { useModal } from '@/context/modal';
import { MODALS, SPACING } from '@/resources/constants';

import { MoreOptionsDropdown } from './dropdown';
import classes from './index.module.css';
import { CreateFunnelFormData } from './schemas';
import { ItemProps } from './types';

export function Item({
  errorMessage,
  editInlineInput,
  index,
  onRemove,
  value,
  register,
  disableDelete,
  formAction,
  useModalsToEdit = false,
  viewOnly,
  loading
}: Readonly<ItemProps<CreateFunnelFormData>>) {
  const t = useTranslations();
  const [isRename, setIsRename] = useState<boolean>(editInlineInput ?? false);
  const { setModal, setData } = useModal();

  const handleRemove = () => {
    if (useModalsToEdit && !isRename) {
      setData({ removeIndex: () => onRemove(index), submitChanges: formAction, stageName: value[index].name });
      setModal(MODALS.DELETE_FUNNEL);
    } else {
      onRemove(index);
    }
  };

  const handleEdit = () => {
    if (useModalsToEdit) {
      if (isRename && formAction) {
        formAction();
        setIsRename(false);
      } else {
        setData({
          // eslint-disable-next-line i18next/no-literal-string
          sourceData: { name: t('onboarding.setup.step3.websiteTracking'), img: '/logo.webp' },
          eventData: value[index]
        });
        setModal(MODALS.EDIT_FUNNEL);
      }
    } else {
      setIsRename(!isRename);
    }
  };

  const editLabel = useMemo(() => (useModalsToEdit ? t('common.settings') : t('common.edit')), [t, useModalsToEdit]);

  return (
    <div className={classes['funnel-stages-list__item']}>
      {isRename || errorMessage ? (
        <TextInput
          error={errorMessage}
          {...register(`stages.${index}.name`)}
          placeholder={t('onboarding.funnels.leads')}
        />
      ) : (
        <Text>{value[index].name}</Text>
      )}
      {!viewOnly && (
        <Flex align="center" justify="center" gap={SPACING.xs}>
          {!disableDelete && !useModalsToEdit && (
            <Button variant="transparent" size="small" onClick={handleRemove}>
              {t('common.remove')}
            </Button>
          )}
          <Button
            loading={loading && !isRename}
            miw={70}
            variant="light"
            size="small"
            onClick={handleEdit}
            disabled={value[index].name.length === 0}
          >
            {isRename ? t('common.save') : editLabel}
          </Button>
          {!disableDelete && useModalsToEdit && !isRename && (
            <MoreOptionsDropdown handleDelete={handleRemove} handleRename={() => setIsRename(true)} />
          )}
        </Flex>
      )}
    </div>
  );
}
