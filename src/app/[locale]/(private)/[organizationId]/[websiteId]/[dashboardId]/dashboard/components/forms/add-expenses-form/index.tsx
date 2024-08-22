'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, ComboboxData, Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Channels, ExpensesCategory, RecurringRepeat } from '@/__generated__/graphql';
import { HeroControl } from '@/components/controls/hero-control';
import { MultiSelectControl } from '@/components/controls/multi-select-control';
import { SelectControl } from '@/components/controls/select-control';
import { SwitchControl } from '@/components/controls/switch-control';
import { ButtonForm } from '@/components/ui/button-form';
import { TextInput } from '@/components/ui/text-input';
import { useModal } from '@/context/modal';
import { SPACING } from '@/resources/constants';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { AddExpenseFormData, AddExpenseSchema } from '../schemas';

import { CreateExpense } from './action';
import classes from './index.module.css';
import { AddExpenseFormProps } from './types';

export function AddExpenseForm({ dashboardId }: Readonly<AddExpenseFormProps>) {
  const t = useTranslations();
  const { destroyModal } = useModal();

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<AddExpenseFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(AddExpenseSchema(t)),
    defaultValues: {
      amount: 0,
      name: '',
      category: undefined,
      channels: undefined,
      recurring: false,
      recurringRepeat: undefined
    }
  });

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    const { recurring, ...remainingData } = formData;
    const { recurringRepeat, ...coreData } = remainingData;
    const data = recurring ? { ...coreData, recurringRepeat } : coreData;

    const response = await CreateExpense({ ...data, dashboardId });

    showResponseToast({
      response,
      showSuccessMessages: true,
      successMessage: t('modals.createExpense.successToastMessage')
    });
    destroyModal();
  });

  const categoryOptions: ComboboxData = useMemo(
    () => [
      { value: ExpensesCategory.ContentCreation, label: t('general.expenses.categories.contentCreation') },
      { value: ExpensesCategory.Contractor, label: t('general.expenses.categories.contractor') },
      { value: ExpensesCategory.FullTimeEmployee, label: t('general.expenses.categories.fullTimeEmployee') },
      { value: ExpensesCategory.MaintenanceAndSupport, label: t('general.expenses.categories.maintenanceAndSupport') },
      {
        value: ExpensesCategory.MarketingAndAdvertising,
        label: t('general.expenses.categories.marketingAndAdvertising')
      },
      { value: ExpensesCategory.Miscellaneous, label: t('general.expenses.categories.miscellaneous') },
      { value: ExpensesCategory.Other, label: t('general.expenses.categories.other') },
      { value: ExpensesCategory.Software, label: t('general.expenses.categories.software') },
      { value: ExpensesCategory.TrainingAndEducation, label: t('general.expenses.categories.trainingAndEducation') }
    ],
    [t]
  );

  const channelsOptions: ComboboxData = useMemo(
    () => [
      { value: Channels.Direct, label: t('general.channels.direct') },
      { value: Channels.Email, label: t('general.channels.email') },
      { value: Channels.Other, label: t('general.channels.other') },
      { value: Channels.Referrals, label: t('general.channels.referrals') },
      { value: Channels.Search, label: t('general.channels.search') },
      { value: Channels.Social, label: t('general.channels.social') }
    ],
    [t]
  );

  const recurring = watch('recurring');
  const recurringRepeatOptions: ComboboxData = useMemo(
    () => [
      { value: RecurringRepeat.Weekly, label: t('modals.budgetGoal.recurring.options.weekly') },
      { value: RecurringRepeat.Monthly, label: t('modals.budgetGoal.recurring.options.monthly') },
      { value: RecurringRepeat.Annually, label: t('modals.budgetGoal.recurring.options.annually') }
    ],
    [t]
  );

  return (
    <form action={formAction} className={classes['add-expenses-form']}>
      <HeroControl
        data-autofocus
        error={errors?.amount?.message}
        hideControls
        thousandSeparator=","
        placeholder={'$5,000'}
        control={control}
        variant="unstyled"
        name="amount"
        prefix="$"
      />
      <Flex direction={'column'} w={'100%'} gap={SPACING.sm}>
        <Flex w={'100%'} gap={SPACING.md}>
          <TextInput
            type="text"
            w={'48%'}
            error={errors?.name?.message}
            className={classes['add-expenses-form--text']}
            {...register('name')}
            placeholder={t('modals.createExpense.descriptionPlaceholder')}
            label={t('modals.createExpense.descriptionLabel')}
          />
          <SelectControl
            label={t('modals.createExpense.categoryLabel')}
            w={'49%'}
            error={errors.category?.message}
            control={control}
            allowDeselect={false}
            name="category"
            data={categoryOptions}
          />
        </Flex>
        <MultiSelectControl
          label={t('modals.createExpense.channelsLabel')}
          w={'100%'}
          error={errors.channels?.message}
          name="channels"
          data={channelsOptions}
          control={control}
        />
      </Flex>

      <div className={classes['add-expenses-form__switch-container']}>
        <Flex justify="space-between" align="center">
          <Text fw={500} fz="heading2" lh="body2">
            {t('modals.createExpense.recurringExpenseLabel')}
          </Text>
          <SwitchControl
            aria-label="Recurring Expense"
            error={errors.recurring?.message}
            control={control}
            name="recurring"
          />
        </Flex>
        {recurring && (
          <Box mt={16}>
            <SelectControl
              label={t('modals.createExpense.expenseTermLabel')}
              w={'100%'}
              error={errors.recurringRepeat?.message}
              control={control}
              allowDeselect={false}
              name="recurringRepeat"
              data={recurringRepeatOptions}
            />
          </Box>
        )}
      </div>
      <div className={classes['activity-goal-form__submit-container']}>
        <ButtonForm variant="filled" type="submit" size="large" w={198} disabled={!isDirty || !isValid}>
          {t('modals.createExpense.button')}
        </ButtonForm>
      </div>
    </form>
  );
}
