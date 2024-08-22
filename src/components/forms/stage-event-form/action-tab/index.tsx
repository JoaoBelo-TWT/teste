import { Flex, Text } from '@mantine/core';
import { Info, X } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useFieldArray } from 'react-hook-form';

import { EventType, UrlCondition } from '@/__generated__/graphql';
import { IconButton } from '@/components/ui/icon-button';
import { InputWithDropdown } from '@/components/ui/input-with-dropdown';
import { Tabs } from '@/components/ui/tabs';
import { Tooltip } from '@/components/ui/tooltip';
import { SPACING } from '@/resources/constants';

import { AppendButton } from '../append-button';
import { Stepper } from '../stepper';
import { TabProps, TouchedFields } from '../types';

import classes from './index.module.css';

export function ActionTab({ control, errors, touchedFields }: Readonly<TabProps>) {
  const t = useTranslations('onboarding.stages.form');

  const conditions = [
    {
      value: UrlCondition.EndsWith,
      label: t('conditionsDropdown.endsWith')
    },
    {
      value: UrlCondition.Equal,
      label: t('conditionsDropdown.equal')
    },
    {
      value: UrlCondition.Includes,
      label: t('conditionsDropdown.includes')
    },
    {
      value: UrlCondition.Matches,
      label: t('conditionsDropdown.matches')
    },
    {
      value: UrlCondition.StartsWith,
      label: t('conditionsDropdown.startsWith')
    }
  ];
  const actionFieldArray = useFieldArray({ control, name: 'actionConditions' });

  const onAddAnotherClick = () =>
    actionFieldArray.append({
      startingUrl: '',
      startingUrlCondition: UrlCondition.Matches,
      destinationUrl: '',
      destinationUrlCondition: UrlCondition.Matches
    });

  const actionErrors = errors?.actionConditions;
  const touched = touchedFields as TouchedFields;

  return (
    <Tabs.Panel value={EventType.Action} classNames={{ panel: classes['action-tab__panel'] }}>
      <div className={classes['action-tab__content']}>
        {actionFieldArray.fields.map((field, index) => {
          const startingUrlErrorMessage = actionErrors?.[index]?.startingUrl?.message;
          const destinationUrlErrorMessage = actionErrors?.[index]?.destinationUrl?.message;
          return (
            <div key={field.id} className={classes['action-tab__input-group']}>
              <div
                className={clsx(
                  classes['action-tab__stepper-container'],
                  destinationUrlErrorMessage ? classes['action-tab__stepper-container--error'] : ''
                )}
              >
                <Stepper
                  firstStepCompleted={
                    (!startingUrlErrorMessage && touched?.[index]?.startingUrl) || !!field.startingUrl
                  }
                  secondStepCompleted={
                    (!destinationUrlErrorMessage && touched?.[index]?.destinationUrl) || !!field.destinationUrl
                  }
                />
              </div>
              <Flex direction="column" gap={SPACING.md} w="100%">
                <InputWithDropdown
                  error={startingUrlErrorMessage}
                  control={control}
                  name={`actionConditions.${index}.startingUrl`}
                  data={conditions}
                  dropdownControlName={`actionConditions.${index}.startingUrlCondition`}
                  label={
                    <>
                      <Text fz="caption2" lh="caption2" span>
                        {t('startingUrlLabel')}
                      </Text>
                      <Tooltip label={t('startingUrlLabel')} w={250}>
                        <Info size={14} />
                      </Tooltip>
                    </>
                  }
                />
                <InputWithDropdown
                  control={control}
                  error={destinationUrlErrorMessage}
                  name={`actionConditions.${index}.destinationUrl`}
                  data={conditions}
                  dropdownControlName={`actionConditions.${index}.destinationUrlCondition`}
                  label={
                    <>
                      <Text fz="caption2" lh="caption2" span>
                        {t('destinationUrlLabel')}
                      </Text>
                      <Tooltip label={t('destinationUrlLabel')} w={250}>
                        <Info size={14} />
                      </Tooltip>
                    </>
                  }
                />
              </Flex>
              <div className={classes['action-tab__delete-button']}>
                {actionFieldArray.fields.length > 1 && (
                  <IconButton w={40} h={'100%'} variant="transparent" onClick={() => actionFieldArray.remove(index)}>
                    <X size={16} />
                  </IconButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes['action-tab__append-button-container']}>
        <AppendButton onClick={onAddAnotherClick} />
      </div>
    </Tabs.Panel>
  );
}
