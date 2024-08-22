'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxData, Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { BudgetGoal, RecurringRepeat } from '@/__generated__/graphql';
import { HeroControl } from '@/components/controls/hero-control';
import { SelectControl } from '@/components/controls/select-control';
import { SwitchControl } from '@/components/controls/switch-control';
import { ButtonForm } from '@/components/ui/button-form';
import { useModal } from '@/context/modal';
import { BudgetGoalFormData, BudgetGoalSchema } from '@/types/goals';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { UpdateBudgetGoal } from './action';
import classes from './index.module.css';

export function EditBudgetGoalForm({
  dashboardId,
  budgetGoal
}: Readonly<{ dashboardId: string; budgetGoal: BudgetGoal }>) {
  const t = useTranslations();
  const { destroyModal } = useModal();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<BudgetGoalFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(BudgetGoalSchema(t)),
    defaultValues: {
      value: budgetGoal.value,
      recurring: budgetGoal.recurring,
      recurringRepeat: (budgetGoal.recurringRepeat as RecurringRepeat) ?? RecurringRepeat.Weekly
    }
  });

  const formAction: () => Promise<void> = handleSubmit(async ({ value, recurring, ...rest }) => {
    const coreData = { value, recurring, dashboardId, currency: budgetGoal.currency };
    const data = recurring ? { ...coreData, ...rest } : coreData;

    const response = await UpdateBudgetGoal({ id: budgetGoal.id, ...data });

    showResponseToast({
      response,
      showSuccessMessages: true,
      successMessage: t('modals.budgetGoal.successToastMessage')
    });

    if (!response.errors) {
      destroyModal();
    }
  });

  const recurring = watch('recurring');

  const recurringRepeatOptions: ComboboxData = [
    { value: RecurringRepeat.Weekly, label: t('modals.budgetGoal.recurring.options.weekly') },
    { value: RecurringRepeat.Monthly, label: t('modals.budgetGoal.recurring.options.monthly') },
    { value: RecurringRepeat.Annually, label: t('modals.budgetGoal.recurring.options.annually') }
  ];

  return (
    <form className={classes['edit-budget-goal-form']} action={formAction}>
      <HeroControl
        data-autofocus
        prefix="$"
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
        error={errors.value?.message}
        control={control}
        allowDecimal
        placeholder="$5,000"
        variant="unstyled"
        hideControls
        name="value"
      />
      <div className={classes['edit-budget-goal-form__switch-container']}>
        <Text fw={500} fz="heading2" lh="body2">
          {t('modals.budgetGoal.recurring.label')}
        </Text>
        <SwitchControl
          aria-label="Recurring Budget"
          error={errors.recurring?.message}
          control={control}
          name="recurring"
        />
      </div>
      {recurring && (
        <div className={classes['edit-budget-goal-form__recurring-container']}>
          <SelectControl
            label={t('modals.budgetGoal.termLabel')}
            w={'100%'}
            error={errors.recurringRepeat?.message}
            control={control}
            allowDeselect={false}
            name="recurringRepeat"
            data={recurringRepeatOptions}
          />
        </div>
      )}
      <Flex gap={6}>
        <ButtonForm
          variant="outline"
          onClick={destroyModal}
          size="large"
          w={198}
          disabled={isSubmitSuccessful || isSubmitting}
        >
          {t('common.cancel')}
        </ButtonForm>
        <ButtonForm variant="filled" type="submit" size="large" w={198} loading={isSubmitSuccessful || isSubmitting}>
          {t('common.save')}
        </ButtonForm>
      </Flex>
    </form>
  );
}
