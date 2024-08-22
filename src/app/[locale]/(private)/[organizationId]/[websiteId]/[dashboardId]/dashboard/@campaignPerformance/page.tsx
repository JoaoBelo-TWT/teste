import { fetchCampaigns } from '@/lib/fetch-campaigns';
import { isConnectedToCRM } from '@/utils/crm-connection-status';

import { DashboardPathParams } from '../types';

import CampaignsCard from './components/campaigns-card';

export default async function Page({
  params
}: Readonly<{
  params: DashboardPathParams;
}>) {
  const { dashboardId, websiteId } = params;

  const dashboardCampaignsData = await fetchCampaigns(dashboardId);
  const connectedToCRM = await isConnectedToCRM(websiteId);

  if (!dashboardCampaignsData) return null;

  return (
    <CampaignsCard viewOnly={!connectedToCRM} dashboardCampaignsData={dashboardCampaignsData?.dashboardCampaignsList} />
  );
}
