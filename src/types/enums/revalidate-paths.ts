export enum RevalidatePath {
  DASHBOARD_OVERVIEW = '/(private)/dashboard/[dashboardId]',
  FUNNEL_STAGES_CREATE = '/(private)/dashboard-create/(stages)/[dashboardId]/create-stages',
  FUNNEL_STAGES_UPDATE = '/(private)/dashboard-create/(stages)/[dashboardId]/stages/[stageId]',
  ONBOARDING_GOALS = '/(private)/dashboard-create/[dashboardId]/goals'
}
