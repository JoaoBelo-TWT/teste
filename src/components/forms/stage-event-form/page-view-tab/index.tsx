import { ComboboxData } from '@mantine/core';
import { X } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useFieldArray } from 'react-hook-form';

import { EventType, VisitorType } from '@/__generated__/graphql';
import { SelectControl } from '@/components/controls/select-control';
import { IconButton } from '@/components/ui/icon-button';
import { Tabs } from '@/components/ui/tabs';
import { TextInput } from '@/components/ui/text-input';

import { AppendButton } from '../append-button';
import { TabProps } from '../types';

import classes from './index.module.css';

export function PageViewTab({ control, register, errors }: Readonly<TabProps>) {
  const pageViewFieldArray = useFieldArray({ control, name: 'pageViewConditions' });
  const t = useTranslations('onboarding.stages.form');

  const visitorTypes: ComboboxData = [
    { value: VisitorType.Unique, label: t('visitorType.options.unique') },
    { value: VisitorType.NewAndReturning, label: t('visitorType.options.newAndReturning') }
  ];

  const pageViewErrors = errors?.pageViewConditions;

  const onAddAnotherClick = () => pageViewFieldArray.append({ pageUrl: '', visitorType: VisitorType.Unique });

  return (
    <Tabs.Panel value={EventType.PageView} classNames={{ panel: classes['page-view-tab__panel'] }}>
      <div className={classes['page-view-tab__input-container']}>
        {pageViewFieldArray.fields.map((field, index) => (
          <div key={field.id} className={classes['page-view-tab__input-group']}>
            <TextInput
              error={pageViewErrors?.[index]?.pageUrl?.message}
              {...register(`pageViewConditions.${index}.pageUrl`)}
              label={t('pageUrlLabel')}
            />

            <SelectControl
              error={pageViewErrors?.[index]?.visitorType?.message}
              allowDeselect={false}
              label={t('visitorType.label')}
              data={visitorTypes}
              withCheckIcon={false}
              name={`pageViewConditions.${index}.visitorType`}
              control={control}
            />

            <div className={classes['page-view-tab__delete-button']}>
              {pageViewFieldArray.fields.length > 1 && (
                <IconButton w={40} h={'100%'} variant="transparent" onClick={() => pageViewFieldArray.remove(index)}>
                  <X size={16} />
                </IconButton>
              )}
            </div>
          </div>
        ))}
      </div>

      <AppendButton onClick={onAddAnotherClick} />
    </Tabs.Panel>
  );
}
