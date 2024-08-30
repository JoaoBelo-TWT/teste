'use client';

import React from 'react';

/* eslint-disable max-len */
import { WebsiteCreationCloseModal } from '@/app/[locale]/(onboarding)/[organizationId]/website/setup/components/close-modal';
import { DashboardCreateCloseModal } from '@/app/[locale]/(onboarding)/components/dashboard-create-close-button/close-modal';
import { EditPermissionsModal } from '@/app/[locale]/(private)/[organizationId]/[websiteId]/organization-settings/components/edit-permissions-modal';
import { InviteTeamMembersModal } from '@/app/[locale]/(private)/[organizationId]/[websiteId]/organization-settings/components/invite-team-members-modal';
import { RemoveTeamMemberModal } from '@/app/[locale]/(private)/[organizationId]/[websiteId]/organization-settings/components/remove-member-modal';
import { AddExpenseModal } from '@/components/modals/add-expenses-modal';
/* eslint-enable max-len */
import { ConfirmConnectionModal } from '@/components/modals/confirm-connection';
import { CreateActivityGoalModal } from '@/components/modals/create-activity-goal';
import { CreateBudgetGoalModal } from '@/components/modals/create-budget-goal';
import { DeleteActivityGoalModal } from '@/components/modals/delete-activity-goal';
import { DeleteBudgetGoalModal } from '@/components/modals/delete-budget-goal';
import { DashboardDeleteModal } from '@/components/modals/delete-dashboard';
import { FunnelDeleteModal } from '@/components/modals/delete-funnel';
import { EditActivityGoalModal } from '@/components/modals/edit-activity-goal';
import { EditBudgetGoalModal } from '@/components/modals/edit-budget-goal-modal';
import { FunnelStageEditModal } from '@/components/modals/edit-funnel-stage';
import { LogoutModal } from '@/components/modals/logout-modal';
import { ModalBase } from '@/components/modals/modal-base';
import { ShareALinkModal } from '@/components/modals/share-a-link-modal';
import { UpsertQuerySelectorsModal } from '@/components/modals/upsert-queryselectors';
import { MODALS } from '@/resources/constants';

import { useModal } from './store';

type ContentProps = {
  form?: string;
};

function Content({ form }: Readonly<ContentProps>) {
  switch (form) {
    case MODALS.LOGOUT:
      return <LogoutModal />;
    case MODALS.INVITE_MEMBERS:
      return <InviteTeamMembersModal />;
    case MODALS.ADD_EXPENSE:
      return <AddExpenseModal />;
    case MODALS.CHANGE_USER_PERMISSIONS:
      return <EditPermissionsModal />;
    case MODALS.REMOVE_TEAM_MEMBER:
      return <RemoveTeamMemberModal />;
    case MODALS.CREATE_CLOSE_DASHBOARD:
      return <DashboardCreateCloseModal />;
    case MODALS.CREATE_WEBSITE_CLOSE:
      return <WebsiteCreationCloseModal />;
    case MODALS.DELETE_DASHBOARD:
      return <DashboardDeleteModal />;
    case MODALS.EDIT_FUNNEL:
      return <FunnelStageEditModal />;
    case MODALS.DELETE_FUNNEL:
      return <FunnelDeleteModal />;
    case MODALS.SHARE_A_LINK:
      return <ShareALinkModal />;
    case MODALS.UPSERT_QUERY_SELECTORS:
      return <UpsertQuerySelectorsModal />;
    case MODALS.CONNECT_CONFIRMATION:
      return <ConfirmConnectionModal />;
    // budget goal modals
    case MODALS.CREATE_BUDGET_GOAL:
      return <CreateBudgetGoalModal />;
    case MODALS.EDIT_BUDGET_GOAL:
      return <EditBudgetGoalModal />;
    case MODALS.DELETE_BUDGET_GOAL:
      return <DeleteBudgetGoalModal />;
    // activity goal modals
    case MODALS.CREATE_ACTIVITY_GOAL:
      return <CreateActivityGoalModal />;
    case MODALS.EDIT_ACTIVITY_GOAL:
      return <EditActivityGoalModal />;
    case MODALS.DELETE_ACTIVITY_GOAL:
      return <DeleteActivityGoalModal />;

    default:
      return null;
  }
}

/**
 * Layout wrapper component
 *
 * @return a react element
 */
export function ModalsProvider() {
  const { modal, destroyModal } = useModal();

  return (
    <ModalBase opened={modal.isModalOpen} onClose={destroyModal}>
      <Content form={modal.form} />
    </ModalBase>
  );
}
