import { GetDashboardCampaignsQuery } from '@/__generated__/graphql';

export interface CampaignsProps {
  viewOnly?: boolean;
  dashboardCampaignsData: GetDashboardCampaignsQuery['dashboardCampaignsList'];
}
