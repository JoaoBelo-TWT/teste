import { create } from 'zustand';

import { DashboardQueryParams, DashboardQueryParamsProps } from '@/types/constants/dashboard-query-params';

interface NavigationStoreState {
  filters: DashboardQueryParamsProps;
  setFilters: (filters: Partial<DashboardQueryParamsProps>) => void;
  triggers: {
    channels: boolean;
    campaigns: boolean;
    journeys: boolean;
    activity: boolean;
    welcome: boolean;
    notifications: boolean;
  };
}

const initializeFilters = (): DashboardQueryParamsProps => ({
  timeframe: DashboardQueryParams.timeframe.default,
  channel: DashboardQueryParams.channel.default,
  channelSorting: DashboardQueryParams.channelSorting.default,
  attributionModel: DashboardQueryParams.attributionModel.default,
  pagesSorting: DashboardQueryParams.pagesSorting.default,
  campaignStatus: DashboardQueryParams.campaignStatus.default,
  campaignSorting: DashboardQueryParams.campaignSorting.default,
  campaignCards: DashboardQueryParams.campaignCards.default,
  notifications: DashboardQueryParams.notifications.default,
  acquisitionChannel: DashboardQueryParams.acquisitionChannel.default
});

const shouldUpdateTrigger = (newFilters: Partial<DashboardQueryParamsProps>, keys: string[]): boolean =>
  keys.some((key) => Object.hasOwn(newFilters, key));

const useNavigationStore = create<NavigationStoreState>((set) => ({
  filters: initializeFilters(),
  triggers: {
    channels: false,
    campaigns: false,
    journeys: false,
    activity: false,
    welcome: false,
    notifications: false
  },
  setFilters: (newFilters) => {
    set((state) => {
      const {
        channelSorting,
        campaignStatus,
        campaignSorting,
        campaignCards,
        attributionModel,
        pagesSorting,
        timeframe
      } = DashboardQueryParams;

      const updatedTriggers = {
        channels: shouldUpdateTrigger(newFilters, [channelSorting.key, timeframe.key]),
        campaigns: shouldUpdateTrigger(newFilters, [
          campaignStatus.key,
          campaignSorting.key,
          campaignCards.key,
          timeframe.key
        ]),
        journeys: shouldUpdateTrigger(newFilters, [attributionModel.key, timeframe.key]),
        activity: shouldUpdateTrigger(newFilters, [pagesSorting.key, timeframe.key]),
        welcome: shouldUpdateTrigger(newFilters, [timeframe.key])
      };

      return {
        filters: { ...state.filters, ...newFilters },
        triggers: { ...state.triggers, ...updatedTriggers }
      };
    });
  }
}));

export { useNavigationStore };
