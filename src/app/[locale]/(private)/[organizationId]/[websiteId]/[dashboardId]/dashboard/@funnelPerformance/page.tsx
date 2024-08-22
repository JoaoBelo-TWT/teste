import { fetchFunnels } from '@/lib/fetch-funnels';
import { DashboardQueryParamsProps } from '@/types/constants/dashboard-query-params';
import { isConnectedToCRM } from '@/utils/crm-connection-status';

import { DashboardPathParams } from '../types';

import CustomerJourney from './components/customer-journey';

export default async function Page({
  params,
  searchParams
}: Readonly<{
  params: DashboardPathParams;
  searchParams: DashboardQueryParamsProps;
}>) {
  const { dashboardId, websiteId } = params;
  const dashboardFunnels = await fetchFunnels(dashboardId, searchParams?.timeframe);
  const connectedToCRM = await isConnectedToCRM(websiteId);

  if (!dashboardFunnels) {
    return null;
  }

  return (
    <CustomerJourney viewOnly={!connectedToCRM} dashboardJourneyData={dashboardFunnels?.dashboardCustomerJourney} />
  );
}
