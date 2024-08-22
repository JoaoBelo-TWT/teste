import { ComboboxData, Flex } from '@mantine/core';
import { getFormatter, getTranslations } from 'next-intl/server';

import { RecurringRepeat } from '@/__generated__/graphql';
import { List } from '@/components/lists/list';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { SPACING } from '@/resources/constants';
import { formatNumber } from '@/utils/formatters/numbers';

import { OpenActivityModalButton } from './buttons/open-activity-modal';
import { OpenBudgetModalButton } from './buttons/open-budget-modal';
import { RemoveButton } from './buttons/remove-button';
import { Item } from './item';
import type { GoalsListProps } from './types';

export async function GoalsList({
  dashboardId,
  budget,
  activity,
  isEdit,
  viewOnly,
  isOnboarding
}: Readonly<GoalsListProps>) {
  const t = await getTranslations();
  const format = await getFormatter();
  const funnelStages = await fetchFunnelStages(dashboardId);

  const customerFunnelStages: ComboboxData | undefined = funnelStages?.customerFunnelStages.edges.map((edge) => ({
    value: edge.node.id,
    label: edge.node.name
  }));

  const getBudgetDescription = () => {
    if (!budget) {
      return t('onboarding.goals.budgetTracker.description');
    }

    const formatBudget = formatNumber({
      value: budget.value || 0,
      nextIntlFormatter: format,
      options: { style: 'currency', currency: 'USD', notation: 'compact' }
    });

    if (!budget.recurring) {
      return t('onboarding.goals.budgetTracker.noRecurring', { budget: formatBudget });
    }

    switch (budget.recurringRepeat) {
      case RecurringRepeat.Weekly:
        return t('onboarding.goals.budgetTracker.recurringWeekly', {
          budget: formatBudget
        });
      case RecurringRepeat.Monthly:
        return t('onboarding.goals.budgetTracker.recurringMonthly', { budget: formatBudget });
      case RecurringRepeat.Annually:
        return t('onboarding.goals.budgetTracker.recurringAnnually', { budget: formatBudget });
      default:
        return t('onboarding.goals.budgetTracker.description');
    }
  };

  const items = [
    {
      id: 'budget',
      children: (
        <Item
          title={t('onboarding.goals.budgetTracker.title')}
          description={getBudgetDescription()}
          hideChildren={viewOnly}
        >
          {budget?.id ? (
            <Flex gap={SPACING.xs} align="center" justify="center">
              <>
                {isEdit && (
                  <OpenBudgetModalButton
                    isEdit
                    text={t('common.settings')}
                    dashboardId={dashboardId}
                    budgetGoal={budget}
                  />
                )}
                <RemoveButton variant={isEdit ? undefined : 'outline'} id={budget.id} isEdit={isEdit} />
              </>
            </Flex>
          ) : (
            <OpenBudgetModalButton
              variant="light"
              text={t('common.add')}
              dashboardId={dashboardId}
              budgetGoal={budget}
            />
          )}
        </Item>
      )
    },
    {
      id: 'activity',
      children: (
        <Item
          title={t('onboarding.goals.websiteActivity.title')}
          description={t('onboarding.goals.websiteActivity.description', { number: activity?.numberOfEvents || 0 })}
          hideChildren={viewOnly}
        >
          {activity?.id ? (
            <Flex gap={SPACING.xs} align="center" justify="center">
              <>
                {isEdit && (
                  <OpenActivityModalButton
                    isEdit
                    text={t('common.settings')}
                    dashboardId={dashboardId}
                    customerFunnelStages={customerFunnelStages}
                    activityGoal={activity}
                  />
                )}
                <RemoveButton
                  type="activity"
                  variant={isEdit ? undefined : 'outline'}
                  id={activity?.id}
                  isEdit={isEdit}
                />
              </>
            </Flex>
          ) : (
            <OpenActivityModalButton
              variant="light"
              text={t('common.add')}
              isEdit={false}
              customerFunnelStages={customerFunnelStages}
              dashboardId={dashboardId}
              activityGoal={activity}
            />
          )}
        </Item>
      )
    }
  ];

  if (isOnboarding) {
    items.pop();
  }

  return <List isDraggable={false} droppableId="goals" items={items} />;
}
