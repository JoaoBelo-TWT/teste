import {
  CampaignSorting,
  CampaignStatusInput,
  ChannelPerformanceSorting,
  DashboardTimeframe,
  PageViewsSorting
} from '@/__generated__/graphql';

import { QueryParamsObject } from '../query-params-object';

export type DashboardModalType = 'expenses';

export type DashboardQueryParamsProps = {
  timeframe: DashboardTimeframe;
  channel: string;
  channelSorting: ChannelPerformanceSorting;
  attributionModel: string;
  pagesSorting: PageViewsSorting;
  campaignStatus: CampaignStatusInput;
  campaignSorting: CampaignSorting;
  campaignCards: number;
  notifications: number;
  modal?: DashboardModalType;
};

export const DashboardQueryParams: QueryParamsObject<DashboardQueryParamsProps> = {
  timeframe: {
    key: 'timeframe',
    default: DashboardTimeframe.LastDay
  },
  channel: {
    key: 'channel',
    default: ''
  },
  channelSorting: {
    key: 'channelSorting',
    default: ChannelPerformanceSorting.Performance
  },
  attributionModel: {
    key: 'attributionModel',
    default: ''
  },
  pagesSorting: {
    key: 'pagesSorting',
    default: PageViewsSorting.MostViews
  },
  campaignStatus: {
    key: 'campaignStatus',
    default: CampaignStatusInput.All
  },
  campaignSorting: {
    key: 'campaignSorting',
    default: CampaignSorting.TopPerforming
  },
  campaignCards: {
    key: 'campaignCards',
    default: 4
  },
  notifications: {
    key: 'notifications',
    default: 6
  }
};
