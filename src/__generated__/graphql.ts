/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: string; output: string; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
  /** JSON custom scalar type */
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  /** UUID custom scalar type */
  UUID: { input: string; output: string; }
};

export enum AccessLevel {
  Admin = 'ADMIN',
  Read = 'READ',
  Write = 'WRITE'
}

export type AcquisitionPerformance = {
  __typename?: 'AcquisitionPerformance';
  count: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
};

export type ActivityGoal = {
  __typename?: 'ActivityGoal';
  createdAt: Scalars['Date']['output'];
  customerFunnelStageId: Scalars['UUID']['output'];
  dashboardId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  numberOfEvents: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ActivityGoalConnection = {
  __typename?: 'ActivityGoalConnection';
  edges: Array<ActivityGoalEdge>;
  pageInfo: PageInfo;
};

export type ActivityGoalEdge = {
  __typename?: 'ActivityGoalEdge';
  cursor: Scalars['String']['output'];
  node: ActivityGoal;
};

export type ActivityGoalsFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  customerFunnelStageId?: InputMaybe<Filters>;
  dashboardId?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  numberOfEvents?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type ActivityInfo = {
  __typename?: 'ActivityInfo';
  customerConversion: Scalars['Int']['output'];
  firstPageVisited: Scalars['String']['output'];
  leadConversion: Scalars['Int']['output'];
  sourceUrl: Scalars['String']['output'];
};

export type BudgetGoal = {
  __typename?: 'BudgetGoal';
  createdAt: Scalars['Date']['output'];
  currency: Scalars['String']['output'];
  dashboardId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  recurring: Scalars['Boolean']['output'];
  recurringRepeat?: Maybe<RecurringRepeat>;
  updatedAt: Scalars['Date']['output'];
  value: Scalars['Float']['output'];
};

export type BudgetGoalConnection = {
  __typename?: 'BudgetGoalConnection';
  edges: Array<BudgetGoalEdge>;
  pageInfo: PageInfo;
};

export type BudgetGoalEdge = {
  __typename?: 'BudgetGoalEdge';
  cursor: Scalars['String']['output'];
  node: BudgetGoal;
};

export type BudgetGoalsFiltersInput = {
  currency?: InputMaybe<Filters>;
  dashboardId?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  recurring?: InputMaybe<Filters>;
  recurringRepeat?: InputMaybe<Filters>;
  value?: InputMaybe<Filters>;
};

export type BudgetUsage = {
  __typename?: 'BudgetUsage';
  /** Budget used until this day */
  amount?: Maybe<Scalars['Float']['output']>;
  /** Day of the month */
  date: Scalars['Date']['output'];
};

export type CampaignPerformance = {
  __typename?: 'CampaignPerformance';
  activity: Array<ActivityInfo>;
  cpc: ConversionCost;
  cpl: ConversionCost;
  firstStageTotals: StageInfo;
  lastStageTotals: StageInfo;
  topPerformer?: Maybe<Scalars['String']['output']>;
  totalActivity: Scalars['Int']['output'];
  /** Total spend for this campaign */
  totalSpend: Scalars['Float']['output'];
  /** Total visits for this campaign */
  totalVisits: Scalars['Int']['output'];
};

export enum CampaignPerformanceSorting {
  MostConversions = 'MostConversions',
  MostRecent = 'MostRecent'
}

export enum CampaignSorting {
  MostRecent = 'MostRecent',
  OldestFirst = 'OldestFirst',
  TopPerforming = 'TopPerforming'
}

export enum CampaignStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum CampaignStatusInput {
  Active = 'Active',
  All = 'All',
  Inactive = 'Inactive'
}

export type ChannelCampaignsCustomerFunnel = {
  __typename?: 'ChannelCampaignsCustomerFunnel';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export enum ChannelFiltersDashboardEnum {
  Direct = 'DIRECT',
  Email = 'EMAIL',
  Referrals = 'REFERRALS',
  Search = 'SEARCH',
  Social = 'SOCIAL'
}

export type ChannelPerformance = {
  __typename?: 'ChannelPerformance';
  /** Cards associated with this funnel stage name */
  channels: Array<ChannelPerformanceCardSummary>;
  /** Count associated with this channel */
  count: Scalars['Int']['output'];
  /** Label for channel performance */
  name: Scalars['String']['output'];
  /** Funnel Stage ID */
  stageId: Scalars['UUID']['output'];
  /** Funnel Stage Name */
  stageName: Scalars['String']['output'];
};

export type ChannelPerformanceActivityDetails = {
  __typename?: 'ChannelPerformanceActivityDetails';
  customerFunnelStageName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  pageUrl?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  searchTerm?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
};

export type ChannelPerformanceCampaign = {
  __typename?: 'ChannelPerformanceCampaign';
  customerFunnels: Array<ChannelCampaignsCustomerFunnel>;
  name: Scalars['String']['output'];
  urlSourcesImages: Array<Scalars['String']['output']>;
};

export type ChannelPerformanceCardSummary = {
  __typename?: 'ChannelPerformanceCardSummary';
  /** Count event */
  count: Scalars['Int']['output'];
  /** Currency */
  currency: Scalars['String']['output'];
  /** Card name */
  name: Channels;
  /** Cost per stage */
  perStage: Scalars['Float']['output'];
  /** Spent associated with this card */
  spend: Scalars['Float']['output'];
};

export type ChannelPerformanceDeepDiveActivityDetails = {
  __typename?: 'ChannelPerformanceDeepDiveActivityDetails';
  activityDetails: Array<ChannelPerformanceActivityDetails>;
  totalActivityDetails: Scalars['Int']['output'];
};

export type ChannelPerformanceDeepDiveCampaigns = {
  __typename?: 'ChannelPerformanceDeepDiveCampaigns';
  campaigns?: Maybe<Array<ChannelPerformanceCampaign>>;
  totalCampaigns: Scalars['Int']['output'];
};

export type ChannelPerformanceDeepDiveOverview = {
  __typename?: 'ChannelPerformanceDeepDiveOverview';
  currency: Scalars['String']['output'];
  customerFunnelsOverView: Array<CustomerFunnelOverview>;
  spend: Scalars['Float']['output'];
};

export type ChannelPerformanceDeepDiveSources = {
  __typename?: 'ChannelPerformanceDeepDiveSources';
  sources?: Maybe<Array<ChannelPerformanceSource>>;
  totalSources: Scalars['Int']['output'];
};

export enum ChannelPerformanceSorting {
  Cost = 'Cost',
  Performance = 'Performance',
  Spend = 'Spend'
}

export type ChannelPerformanceSource = {
  __typename?: 'ChannelPerformanceSource';
  customerFunnels: Array<ChannelCampaignsCustomerFunnel>;
  name: Scalars['String']['output'];
  urlSourceImage: Scalars['String']['output'];
};

export enum Channels {
  Affiliates = 'AFFILIATES',
  Direct = 'DIRECT',
  Display = 'DISPLAY',
  Email = 'EMAIL',
  NonPaidSocial = 'NON_PAID_SOCIAL',
  OrganicSearch = 'ORGANIC_SEARCH',
  Other = 'OTHER',
  PaidSearch = 'PAID_SEARCH',
  PaidSocial = 'PAID_SOCIAL',
  Referrals = 'REFERRALS',
  Search = 'SEARCH',
  Shopping = 'SHOPPING',
  Social = 'SOCIAL',
  Video = 'VIDEO'
}

export type ChartData = {
  __typename?: 'ChartData';
  date: Scalars['Date']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type CompanyIndustriesFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type CompanyIndustry = {
  __typename?: 'CompanyIndustry';
  createdAt: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CompanyIndustryConnection = {
  __typename?: 'CompanyIndustryConnection';
  edges: Array<CompanyIndustryEdge>;
  pageInfo: PageInfo;
};

export type CompanyIndustryEdge = {
  __typename?: 'CompanyIndustryEdge';
  cursor: Scalars['String']['output'];
  node: CompanyIndustry;
};

export type CompanyRole = {
  __typename?: 'CompanyRole';
  createdAt: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CompanyRoleConnection = {
  __typename?: 'CompanyRoleConnection';
  edges: Array<CompanyRoleEdge>;
  pageInfo: PageInfo;
};

export type CompanyRoleEdge = {
  __typename?: 'CompanyRoleEdge';
  cursor: Scalars['String']['output'];
  node: CompanyRole;
};

export type CompanyRolesFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type CompanySize = {
  __typename?: 'CompanySize';
  createdAt: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CompanySizeConnection = {
  __typename?: 'CompanySizeConnection';
  edges: Array<CompanySizeEdge>;
  pageInfo: PageInfo;
};

export type CompanySizeEdge = {
  __typename?: 'CompanySizeEdge';
  cursor: Scalars['String']['output'];
  node: CompanySize;
};

export type CompanySizesFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type ConversionCost = {
  __typename?: 'ConversionCost';
  cost: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type CreateActivityGoalInput = {
  customerFunnelStageId: Scalars['UUID']['input'];
  dashboardId: Scalars['UUID']['input'];
  numberOfEvents: Scalars['Int']['input'];
};

export type CreateBudgetGoalInput = {
  currency: Scalars['String']['input'];
  dashboardId: Scalars['UUID']['input'];
  recurring: Scalars['Boolean']['input'];
  recurringRepeat?: InputMaybe<RecurringRepeat>;
  value: Scalars['Float']['input'];
};

export type CreateCustomerFunnelStageEventConditionInput = {
  destinationUrl?: InputMaybe<Scalars['String']['input']>;
  destinationUrlCondition?: InputMaybe<UrlCondition>;
  pageUrl?: InputMaybe<Scalars['String']['input']>;
  startingUrl?: InputMaybe<Scalars['String']['input']>;
  startingUrlCondition?: InputMaybe<UrlCondition>;
  visitorType?: InputMaybe<VisitorType>;
};

export type CreateCustomerFunnelStageEventInput = {
  customerFunnelStageEventConditions: Array<CreateCustomerFunnelStageEventConditionInput>;
  eventType: EventType;
  name: Scalars['String']['input'];
};

export type CreateCustomerFunnelStageInput = {
  customerFunnelStageEvents?: InputMaybe<Array<CreateCustomerFunnelStageEventInput>>;
  dashboardId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateDashboardInput = {
  dashboardType: DashboardType;
  name: Scalars['String']['input'];
  websiteId: Scalars['UUID']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  category?: InputMaybe<ExpensesCategory>;
  channels?: InputMaybe<Array<Channels>>;
  dashboardId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  recurringRepeat?: InputMaybe<RecurringRepeat>;
};

export type CreateNotificationInput = {
  message: Scalars['String']['input'];
  notificationType: NotificationType;
  title: Scalars['String']['input'];
  websiteId: Scalars['UUID']['input'];
};

export type CreateOrganizationInput = {
  companyIndustryId: Scalars['UUID']['input'];
  companySizeId: Scalars['UUID']['input'];
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreatePermissionInput = {
  organizationId: Scalars['UUID']['input'];
  permissions: Array<PermissionsInput>;
};

export type CreateWebsiteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  pixelScriptGenerationStatus?: InputMaybe<PixelScriptGenerationStatus>;
  scriptUrl?: InputMaybe<Scalars['String']['input']>;
  snippetUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerFunnelOverview = {
  __typename?: 'CustomerFunnelOverview';
  costPer: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organicCount?: Maybe<Scalars['Int']['output']>;
  paidCount?: Maybe<Scalars['Int']['output']>;
  totalCount: Scalars['Int']['output'];
};

export type CustomerFunnelStage = {
  __typename?: 'CustomerFunnelStage';
  createdAt: Scalars['Date']['output'];
  customerFunnelStageEvents?: Maybe<Array<CustomerFunnelStageEvent>>;
  dashboardId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  previousStageId?: Maybe<Scalars['UUID']['output']>;
  updatedAt: Scalars['Date']['output'];
  value: Scalars['String']['output'];
};

export type CustomerFunnelStageConnection = {
  __typename?: 'CustomerFunnelStageConnection';
  edges: Array<CustomerFunnelStageEdge>;
  pageInfo: PageInfo;
};

export type CustomerFunnelStageEdge = {
  __typename?: 'CustomerFunnelStageEdge';
  cursor: Scalars['String']['output'];
  node: CustomerFunnelStage;
};

export type CustomerFunnelStageEvent = {
  __typename?: 'CustomerFunnelStageEvent';
  createdAt: Scalars['Date']['output'];
  customerFunnelStageEventConditions?: Maybe<Array<CustomerFunnelStageEventCondition>>;
  customerFunnelStageId: Scalars['UUID']['output'];
  eventType: EventType;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CustomerFunnelStageEventCondition = {
  __typename?: 'CustomerFunnelStageEventCondition';
  createdAt: Scalars['Date']['output'];
  customerFunnelStageEventId: Scalars['UUID']['output'];
  destinationUrl?: Maybe<Scalars['String']['output']>;
  destinationUrlCondition?: Maybe<UrlCondition>;
  id: Scalars['UUID']['output'];
  pageUrl?: Maybe<Scalars['String']['output']>;
  startingUrl?: Maybe<Scalars['String']['output']>;
  startingUrlCondition?: Maybe<UrlCondition>;
  updatedAt: Scalars['Date']['output'];
  visitorType?: Maybe<VisitorType>;
};

export type CustomerFunnelStagesFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  customerFunnelEvents?: InputMaybe<Filters>;
  dashboardId?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type Dashboard = {
  __typename?: 'Dashboard';
  createdAt: Scalars['Date']['output'];
  dashboardType: DashboardType;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  websiteId: Scalars['UUID']['output'];
};

export type DashboardAcquisitionPerformance = {
  __typename?: 'DashboardAcquisitionPerformance';
  acquisitionPerformance: Array<AcquisitionPerformance>;
  endDate: Scalars['Date']['output'];
  /** Returns false if no funnels stages are present for the given dashboardId */
  isSetup: Scalars['Boolean']['output'];
  startDate: Scalars['Date']['output'];
};

export type DashboardActivityGoal = {
  __typename?: 'DashboardActivityGoal';
  activityGoalProgress: Array<ChartData>;
  completesInDays: Scalars['Int']['output'];
  currentNumberOfEvents: Scalars['Int']['output'];
  customerFunnelStageName: Scalars['String']['output'];
  dashboardId: Scalars['UUID']['output'];
  isSetup: Scalars['Boolean']['output'];
  totalNumberOfEvents: Scalars['Int']['output'];
};

export type DashboardBudget = {
  __typename?: 'DashboardBudget';
  /** Array with the budget used for the current timeframe */
  budgetUsage: Array<BudgetUsage>;
  /** Budget currency */
  currency: Scalars['String']['output'];
  dashboardId: Scalars['UUID']['output'];
  isSetup: Scalars['Boolean']['output'];
  /** Budget term */
  recurring: Scalars['Boolean']['output'];
  /** Budget term */
  recurringRepeat?: Maybe<RecurringRepeat>;
  /** Budget Renews in X days */
  renewsIn?: Maybe<Scalars['Int']['output']>;
  /** Budget Amount */
  totalAmount: Scalars['Float']['output'];
  /** Budget used for the current timeframe */
  usedAmount: Scalars['Float']['output'];
};

export type DashboardCampaign = {
  __typename?: 'DashboardCampaign';
  /** Customer Acquisition Cost */
  cac: Scalars['Float']['output'];
  /** Platform of the campaign */
  campaignSource: Scalars['String']['output'];
  /** Customer Acquisition Cost (CAC) Currency used */
  currency: Scalars['String']['output'];
  /** Customers */
  customers: DashboardCustomerFunnel;
  /** Campaign end date */
  endDate: Scalars['DateTime']['output'];
  /** Leads */
  leads: DashboardCustomerFunnel;
  /** Campaign name */
  name: Scalars['String']['output'];
  /** Spend */
  spend: Scalars['Float']['output'];
  /** Campaign start date */
  startDate: Scalars['DateTime']['output'];
  /** Campaign name */
  status: CampaignStatus;
  /** Array with sources icons Name */
  urlSourcesImages: Array<Scalars['String']['output']>;
  /** Visits */
  visits: Scalars['Int']['output'];
};

export type DashboardCampaignsList = {
  __typename?: 'DashboardCampaignsList';
  /** Array with campaigns */
  campaigns: Array<DashboardCampaign>;
  dashboardId: Scalars['UUID']['output'];
  /** Does campaigns have any events */
  hasEvents: Scalars['Boolean']['output'];
  /** Period */
  period: DashboardTimeframe;
  /** Total Campaigns */
  totalCampaigns: Scalars['Int']['output'];
  /** Total Conversions */
  totalConversions: Scalars['Int']['output'];
  /** Period */
  totalVisits: Scalars['Int']['output'];
};

export type DashboardChannelPerformance = {
  __typename?: 'DashboardChannelPerformance';
  /** Channel performance arrays */
  channelsPerformance: Array<ChannelPerformance>;
  dashboardId: Scalars['UUID']['output'];
  /** Does channel have any events */
  hasEvents: Scalars['Boolean']['output'];
  /** Does channel has funnels */
  isSetup: Scalars['Boolean']['output'];
  /** Period */
  period: DashboardTimeframe;
};

export type DashboardConnection = {
  __typename?: 'DashboardConnection';
  edges: Array<DashboardEdge>;
  pageInfo: PageInfo;
};

export type DashboardCustomerFunnel = {
  __typename?: 'DashboardCustomerFunnel';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type DashboardCustomerJourney = {
  __typename?: 'DashboardCustomerJourney';
  dashboardId: Scalars['UUID']['output'];
  /** Does dashboard customer have any events */
  hasEvents: Scalars['Boolean']['output'];
  /** Does dashboard customer has funnels */
  isSetup: Scalars['Boolean']['output'];
  /** Lead generation */
  journeys: Array<Journey>;
  /** Period */
  period: DashboardTimeframe;
};

export type DashboardEdge = {
  __typename?: 'DashboardEdge';
  cursor: Scalars['String']['output'];
  node: Dashboard;
};

export type DashboardOverview = {
  __typename?: 'DashboardOverview';
  /** Customer Acquisition Cost (CAC) */
  cac: Scalars['Float']['output'];
  /** Customer Acquisition Cost (CAC) Currency used */
  cacCurrency: Scalars['String']['output'];
  /** Conversion (signups/visits) */
  conversion: Scalars['Float']['output'];
  dashboardId: Scalars['UUID']['output'];
  /** End date */
  endDate: Scalars['Date']['output'];
  /** Does dashboard has any events */
  hasEvents: Scalars['Boolean']['output'];
  /** Does channel has funnels */
  isSetup: Scalars['Boolean']['output'];
  /** Leads */
  leads: DashboardCustomerFunnel;
  /** New Customers */
  newCustomers: DashboardCustomerFunnel;
  /** Period */
  period: DashboardTimeframe;
  /** Start date */
  startDate: Scalars['Date']['output'];
  /** Status of the current overview, if it is going well or not */
  status: DashboardOverviewStatus;
  websiteConversionRate: Scalars['Float']['output'];
};

export enum DashboardOverviewStatus {
  Green = 'Green',
  Orange = 'Orange'
}

export enum DashboardTimeframe {
  LastDay = 'LastDay',
  PreviousDay = 'PreviousDay',
  PreviousMonth = 'PreviousMonth',
  PreviousWeek = 'PreviousWeek',
  PreviousYear = 'PreviousYear',
  ThisMonth = 'ThisMonth',
  ThisWeek = 'ThisWeek',
  ThisYear = 'ThisYear'
}

export enum DashboardType {
  Executive = 'Executive',
  Organic = 'Organic',
  Paid = 'Paid'
}

export type DashboardWebsiteActivity = {
  __typename?: 'DashboardWebsiteActivity';
  conversionRate: Scalars['Float']['output'];
  dashboardId: Scalars['UUID']['output'];
  domain?: Maybe<Scalars['String']['output']>;
  /** Does channel have any events */
  hasEvents: Scalars['Boolean']['output'];
  pageViews: Array<DashboardWebsiteActivityPageViews>;
  period: DashboardTimeframe;
  sources: Array<DashboardWebsiteActivitySources>;
  totalConversions: Scalars['Int']['output'];
  totalSources: Scalars['Int']['output'];
  totalWebsiteVisits: Scalars['Int']['output'];
  traffic: Array<DashboardWebsiteActivityTraffic>;
  websiteImageUrl: Scalars['String']['output'];
};

export type DashboardWebsiteActivityPageViews = {
  __typename?: 'DashboardWebsiteActivityPageViews';
  conversions: Scalars['Int']['output'];
  page: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type DashboardWebsiteActivitySources = {
  __typename?: 'DashboardWebsiteActivitySources';
  conversions: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type DashboardWebsiteActivityTraffic = {
  __typename?: 'DashboardWebsiteActivityTraffic';
  date: Scalars['Date']['output'];
  /** Page Views */
  pageViews?: Maybe<Scalars['Int']['output']>;
};

export type DashboardsFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
  websiteId?: InputMaybe<Filters>;
};

export type DeleteOrganizationImageInput = {
  organizationId: Scalars['String']['input'];
};

export type DeleteUserImageInput = {
  userId: Scalars['String']['input'];
};

export type DeleteWebsiteImageInput = {
  websiteId: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  browser?: Maybe<Scalars['String']['output']>;
  channel?: Maybe<Scalars['String']['output']>;
  colorDepth: Scalars['Int']['output'];
  documentEncoding: Scalars['String']['output'];
  documentLocation: Scalars['String']['output'];
  documentTitle: Scalars['String']['output'];
  domain?: Maybe<Scalars['String']['output']>;
  event: Scalars['String']['output'];
  eventData?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['UUID']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  isMobile: Scalars['String']['output'];
  referrerLocation?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  screenResolution: Scalars['String']['output'];
  timestamp: Scalars['Date']['output'];
  timezone: Scalars['Int']['output'];
  userAgent: Scalars['String']['output'];
  utmCampaign?: Maybe<Scalars['String']['output']>;
  utmContent?: Maybe<Scalars['String']['output']>;
  utmCreativeFormat?: Maybe<Scalars['String']['output']>;
  utmMarketingTactic?: Maybe<Scalars['String']['output']>;
  utmMedium?: Maybe<Scalars['String']['output']>;
  utmSource?: Maybe<Scalars['String']['output']>;
  utmSourcePlatform?: Maybe<Scalars['String']['output']>;
  utmTerm?: Maybe<Scalars['String']['output']>;
  version: Scalars['String']['output'];
  viewportSize: Scalars['String']['output'];
  visitingUserId?: Maybe<Scalars['UUID']['output']>;
  website?: Maybe<Website>;
  websiteId: Scalars['UUID']['output'];
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export enum EventType {
  Action = 'Action',
  PageView = 'PageView'
}

export type EventsFiltersInput = {
  browser?: InputMaybe<Filters>;
  colorDepth?: InputMaybe<Filters>;
  createdAt?: InputMaybe<Filters>;
  documentEncoding?: InputMaybe<Filters>;
  documentLocation?: InputMaybe<Filters>;
  documentTitle?: InputMaybe<Filters>;
  event?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  isMobile?: InputMaybe<Filters>;
  referrerLocation?: InputMaybe<Filters>;
  screenResolution?: InputMaybe<Filters>;
  timestamp?: InputMaybe<Filters>;
  timezone?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
  userAgent?: InputMaybe<Filters>;
  utmCampaign?: InputMaybe<Filters>;
  utmContent?: InputMaybe<Filters>;
  utmCreativeFormat?: InputMaybe<Filters>;
  utmMarketingTactic?: InputMaybe<Filters>;
  utmMedium?: InputMaybe<Filters>;
  utmSource?: InputMaybe<Filters>;
  utmSourcePlatform?: InputMaybe<Filters>;
  utmTerm?: InputMaybe<Filters>;
  version?: InputMaybe<Filters>;
  viewportSize?: InputMaybe<Filters>;
  visitingUserId?: InputMaybe<Filters>;
  websiteId?: InputMaybe<Filters>;
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category?: Maybe<ExpensesCategory>;
  channels?: Maybe<Array<Channels>>;
  createdAt: Scalars['Date']['output'];
  dashboardId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  recurringRepeat?: Maybe<RecurringRepeat>;
  updatedAt: Scalars['Date']['output'];
};

export type ExpenseConnection = {
  __typename?: 'ExpenseConnection';
  edges: Array<ExpenseEdge>;
  pageInfo: PageInfo;
};

export type ExpenseEdge = {
  __typename?: 'ExpenseEdge';
  cursor: Scalars['String']['output'];
  node: Expense;
};

export enum ExpensesCategory {
  ContentCreation = 'ContentCreation',
  Contractor = 'Contractor',
  FullTimeEmployee = 'FullTimeEmployee',
  MaintenanceAndSupport = 'MaintenanceAndSupport',
  MarketingAndAdvertising = 'MarketingAndAdvertising',
  Miscellaneous = 'Miscellaneous',
  Other = 'Other',
  Software = 'Software',
  TrainingAndEducation = 'TrainingAndEducation'
}

export type ExpensesFiltersInput = {
  amount?: InputMaybe<Filters>;
  category?: InputMaybe<Filters>;
  channels?: InputMaybe<Filters>;
  createdAt?: InputMaybe<Filters>;
  dashboardId?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  recurringRepeat?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type Filters = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FunnelPerformanceConversion = {
  __typename?: 'FunnelPerformanceConversion';
  conversions: Scalars['Int']['output'];
  firstPageVisited?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  urlSourceImage?: Maybe<Scalars['String']['output']>;
};

export type FunnelPerformanceConversionDetails = {
  __typename?: 'FunnelPerformanceConversionDetails';
  funnelName: Scalars['String']['output'];
  funnelPerformanceConversionEvents: Array<FunnelPerformanceConversionEvents>;
  totalFunnelPerformanceConversionEvents: Scalars['Int']['output'];
  totalSearchTerms: Scalars['Int']['output'];
};

export type FunnelPerformanceConversionEvents = {
  __typename?: 'FunnelPerformanceConversionEvents';
  channel?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstPageVisited?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  searchTerm?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type FunnelPerformanceDeepDive = {
  __typename?: 'FunnelPerformanceDeepDive';
  funnelName: Scalars['String']['output'];
  funnelPerformanceConversions: Array<FunnelPerformanceConversion>;
  totalConversions: Scalars['Int']['output'];
  totalEvents: Scalars['Int']['output'];
  totalFunnelPerformanceConversions: Scalars['Int']['output'];
};

export enum FunnelPerformanceSorting {
  MostConversions = 'MostConversions',
  MostRecent = 'MostRecent'
}

export enum GoogleAdsIntegrationStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  OutOfSync = 'OUT_OF_SYNC'
}

export enum HubspotIntegrationStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  OutOfSync = 'OUT_OF_SYNC'
}

export type Journey = {
  __typename?: 'Journey';
  /** Number of events in this journey */
  conversionEvents: Scalars['Int']['output'];
  /** Number of events in this journey compared to previous journey percentage */
  conversionEventsPercentage: Scalars['Float']['output'];
  /** Events being used in this journey */
  events?: Maybe<Array<JourneyEvents>>;
  id: Scalars['UUID']['output'];
  /** Journey Name */
  name: Scalars['String']['output'];
};

export type JourneyEvents = {
  __typename?: 'JourneyEvents';
  id: Scalars['UUID']['output'];
  /** Event Name */
  name: Scalars['String']['output'];
};

export type Me = {
  __typename?: 'Me';
  companyIndustryId?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companyRoleId?: Maybe<Scalars['String']['output']>;
  companySizeId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  currentOnboardingPath?: Maybe<Scalars['String']['output']>;
  defaultOrganizationId?: Maybe<Scalars['UUID']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Array<MePermission>>;
  sub?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type MePermission = {
  __typename?: 'MePermission';
  accessLevel: Scalars['String']['output'];
  dashboardId?: Maybe<Scalars['UUID']['output']>;
  organizationId?: Maybe<Scalars['UUID']['output']>;
  websiteId?: Maybe<Scalars['UUID']['output']>;
};

export enum MembersInvitationStatus {
  Active = 'Active',
  Pending = 'Pending'
}

export enum MetaAdsIntegrationStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  OutOfSync = 'OUT_OF_SYNC'
}

export type Mutation = {
  __typename?: 'Mutation';
  createActivityGoal: ActivityGoal;
  createBudgetGoal: BudgetGoal;
  createCustomerFunnelStage: Array<CustomerFunnelStage>;
  createCustomerFunnelStageEvents: Array<CustomerFunnelStageEvent>;
  createDashboard: Dashboard;
  createExpense: Expense;
  createNotification: Notification;
  createOrganization: Organization;
  createPermission: Array<Permission>;
  createWebsite: Website;
  deleteOrganizationImage: Organization;
  deleteUserImage: User;
  deleteWebsiteImage: Website;
  removeActivityGoal: Scalars['String']['output'];
  removeBudgetGoal: Scalars['String']['output'];
  removeCustomerFunnelStage: Scalars['String']['output'];
  removeCustomerFunnelStageEvent: Scalars['String']['output'];
  removeDashboard: Scalars['String']['output'];
  removeExpense: Scalars['String']['output'];
  removeNotification: Scalars['String']['output'];
  removeOrganization: Scalars['String']['output'];
  removePermission: Scalars['String']['output'];
  removeUser: Scalars['String']['output'];
  removeWebsite: Scalars['String']['output'];
  sendConnectionsRecommendationEmail: Scalars['Boolean']['output'];
  sendShareALinkSetupEmail: Scalars['Boolean']['output'];
  setCurrentOnboardingPath: User;
  updateActivityGoal: ActivityGoal;
  updateBudgetGoal: BudgetGoal;
  updateCustomerFunnelStage: CustomerFunnelStage;
  updateDashboard: Dashboard;
  updateExpense: Expense;
  updateNotification: Notification;
  updateOrganization: Organization;
  updatePermission: Permission;
  updateUser: User;
  updateWebsite: Website;
  uploadOrganizationImage: Organization;
  uploadUserImage: User;
  uploadWebsiteImage: Website;
  /**
   * Mutation used to upsert customer funnel stages and maintain the received order.
   *       If the stage does not exist, it will be created.
   *       If it exists, it will be updated.
   *       If the stage is not present in the array, it will be removed.
   *       The order of the stages will be the same as the received array.
   */
  upsertCustomerFunnelStage: Array<CustomerFunnelStage>;
  upsertSelector: Array<Selector>;
};


export type MutationCreateActivityGoalArgs = {
  createActivityGoalInput: CreateActivityGoalInput;
};


export type MutationCreateBudgetGoalArgs = {
  createBudgetGoalInput: CreateBudgetGoalInput;
};


export type MutationCreateCustomerFunnelStageArgs = {
  createCustomerFunnelStageInput: Array<CreateCustomerFunnelStageInput>;
};


export type MutationCreateCustomerFunnelStageEventsArgs = {
  createCustomerFunnelStageEventsInput: Array<CreateCustomerFunnelStageEventInput>;
  customerFunnelStageId: Scalars['UUID']['input'];
};


export type MutationCreateDashboardArgs = {
  createDashboardInput: CreateDashboardInput;
};


export type MutationCreateExpenseArgs = {
  createExpenseInput: CreateExpenseInput;
};


export type MutationCreateNotificationArgs = {
  createNotificationInput: CreateNotificationInput;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationInput;
};


export type MutationCreatePermissionArgs = {
  createPermissionInput: CreatePermissionInput;
};


export type MutationCreateWebsiteArgs = {
  createWebsiteInput: CreateWebsiteInput;
};


export type MutationDeleteOrganizationImageArgs = {
  deleteOrganizationImageInput: DeleteOrganizationImageInput;
};


export type MutationDeleteUserImageArgs = {
  deleteUserImageInput: DeleteUserImageInput;
};


export type MutationDeleteWebsiteImageArgs = {
  deleteWebsiteImageInput: DeleteWebsiteImageInput;
};


export type MutationRemoveActivityGoalArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveBudgetGoalArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveCustomerFunnelStageArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveCustomerFunnelStageEventArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveDashboardArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveOrganizationArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemovePermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveWebsiteArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationSendConnectionsRecommendationEmailArgs = {
  sendConnectionsRecommendationEmailInput: SendConnectionsRecommendationEmailInput;
};


export type MutationSendShareALinkSetupEmailArgs = {
  sendShareALinkSetupEmailInput: SendShareALinkSetupEmailInput;
};


export type MutationSetCurrentOnboardingPathArgs = {
  currentOnboardingPath?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateActivityGoalArgs = {
  updateActivityGoalInput: UpdateActivityGoalInput;
};


export type MutationUpdateBudgetGoalArgs = {
  updateBudgetGoalInput: UpdateBudgetGoalInput;
};


export type MutationUpdateCustomerFunnelStageArgs = {
  updateCustomerFunnelStageInput: UpdateCustomerFunnelStageInput;
};


export type MutationUpdateDashboardArgs = {
  updateDashboardInput: UpdateDashboardInput;
};


export type MutationUpdateExpenseArgs = {
  updateExpenseInput: UpdateExpenseInput;
};


export type MutationUpdateNotificationArgs = {
  updateNotificationInput: UpdateNotificationInput;
};


export type MutationUpdateOrganizationArgs = {
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdatePermissionArgs = {
  updatePermissionInput: UpdatePermissionInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateWebsiteArgs = {
  updateWebsiteInput: UpdateWebsiteInput;
};


export type MutationUploadOrganizationImageArgs = {
  uploadOrganizationImageInput: UploadOrganizationImageInput;
};


export type MutationUploadUserImageArgs = {
  uploadUserImageInput: UploadUserImageInput;
};


export type MutationUploadWebsiteImageArgs = {
  uploadWebsiteImageInput: UploadWebsiteImageInput;
};


export type MutationUpsertCustomerFunnelStageArgs = {
  upsertCustomerFunnelStageInput: Array<UpsertCustomerFunnelStageInput>;
};


export type MutationUpsertSelectorArgs = {
  selectors: Array<UpsertSelectorInput>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  message: Scalars['String']['output'];
  notificationType: NotificationType;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  websiteId: Scalars['UUID']['output'];
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
};

export enum NotificationType {
  SourcePixel = 'SOURCE_PIXEL',
  SyncComplete = 'SYNC_COMPLETE',
  SyncFailure = 'SYNC_FAILURE'
}

export type NotificationsFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  message?: InputMaybe<Filters>;
  notificationType?: InputMaybe<Filters>;
  title?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
  websiteId?: InputMaybe<Filters>;
};

export type Organization = {
  __typename?: 'Organization';
  companyIndustryId?: Maybe<Scalars['String']['output']>;
  companySizeId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  defaultWebsiteId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  user: User;
  userId: Scalars['String']['output'];
  website?: Maybe<Website>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  edges: Array<OrganizationEdge>;
  pageInfo: PageInfo;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  cursor: Scalars['String']['output'];
  node: Organization;
};

export type OrganizationsFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  name?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
  userId?: InputMaybe<Filters>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum PageViewsSorting {
  MostConversions = 'MostConversions',
  MostViews = 'MostViews'
}

export type Permission = {
  __typename?: 'Permission';
  accessLevel: Scalars['UUID']['output'];
  createdAt: Scalars['Date']['output'];
  dashboardId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  invitationStatus: MembersInvitationStatus;
  organizationId: Scalars['UUID']['output'];
  updatedAt: Scalars['Date']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
  websiteId?: Maybe<Scalars['UUID']['output']>;
};

export type PermissionConnection = {
  __typename?: 'PermissionConnection';
  edges: Array<PermissionEdge>;
  pageInfo: PageInfo;
  totalTeamMembers: Scalars['Int']['output'];
};

export type PermissionEdge = {
  __typename?: 'PermissionEdge';
  cursor: Scalars['String']['output'];
  node: Permission;
};

export type PermissionsFiltersInput = {
  accessLevel?: InputMaybe<Filters>;
  createdAt?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  organizationId?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
  userId?: InputMaybe<Filters>;
};

export type PermissionsInput = {
  accessLevel: AccessLevel;
  email: Scalars['String']['input'];
};

export enum PixelScriptGenerationStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS'
}

export type Query = {
  __typename?: 'Query';
  activityGoal: ActivityGoal;
  activityGoals: ActivityGoalConnection;
  budgetGoal: BudgetGoal;
  budgetGoals: BudgetGoalConnection;
  campaignPerformanceDeepDiveOverview: CampaignPerformance;
  channelPerformanceDeepDiveActivityDetails: ChannelPerformanceDeepDiveActivityDetails;
  channelPerformanceDeepDiveCampaigns: ChannelPerformanceDeepDiveCampaigns;
  channelPerformanceDeepDiveOverview: ChannelPerformanceDeepDiveOverview;
  channelPerformanceDeepDiveSources: ChannelPerformanceDeepDiveSources;
  companyIndustries: CompanyIndustryConnection;
  companyIndustry: CompanyIndustry;
  companyRole: CompanyRole;
  companyRoles: CompanyRoleConnection;
  companySize: CompanySize;
  companySizes: CompanySizeConnection;
  customerFunnelStage: CustomerFunnelStage;
  customerFunnelStages: CustomerFunnelStageConnection;
  dashboard: Dashboard;
  dashboardAcquisitionPerformance: DashboardAcquisitionPerformance;
  dashboardActivityGoal: DashboardActivityGoal;
  dashboardBudget: DashboardBudget;
  dashboardCampaignsList: DashboardCampaignsList;
  dashboardChannelPerformance: DashboardChannelPerformance;
  dashboardCustomerJourney: DashboardCustomerJourney;
  dashboardOverview: DashboardOverview;
  dashboardWebsiteActivity: DashboardWebsiteActivity;
  dashboards: DashboardConnection;
  event: Event;
  events: EventConnection;
  expense: Expense;
  expenses: ExpenseConnection;
  funnelPerformanceDeepDive: FunnelPerformanceDeepDive;
  funnelPerformanceDeepDiveConversionDetails: FunnelPerformanceConversionDetails;
  generatePixelScript: Scalars['String']['output'];
  getCustomerFunnelStagesWithConditions: Array<CustomerFunnelStage>;
  isHubspotConnected?: Maybe<HubspotIntegrationStatus>;
  isWebsiteConnected: Scalars['Boolean']['output'];
  me: Me;
  notification: Notification;
  notifications: NotificationConnection;
  organization: Organization;
  organizations: OrganizationConnection;
  permission: Permission;
  permissions: PermissionConnection;
  purgeAllCache: Scalars['String']['output'];
  regenerateCache: Scalars['String']['output'];
  selectors: Array<Selector>;
  user: User;
  users: UserConnection;
  version: Scalars['String']['output'];
  website: Website;
  websites: WebsiteConnection;
};


export type QueryActivityGoalArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryActivityGoalsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<ActivityGoalsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBudgetGoalArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryBudgetGoalsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<BudgetGoalsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCampaignPerformanceDeepDiveOverviewArgs = {
  campaignName: Scalars['String']['input'];
  campaignPerformanceSorting?: InputMaybe<CampaignPerformanceSorting>;
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelPerformanceDeepDiveActivityDetailsArgs = {
  channelName: ChannelFiltersDashboardEnum;
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelPerformanceDeepDiveCampaignsArgs = {
  channelName: ChannelFiltersDashboardEnum;
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelPerformanceDeepDiveOverviewArgs = {
  channelName: ChannelFiltersDashboardEnum;
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
};


export type QueryChannelPerformanceDeepDiveSourcesArgs = {
  channelName: ChannelFiltersDashboardEnum;
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompanyIndustriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CompanyIndustriesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompanyIndustryArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryCompanyRoleArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryCompanyRolesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CompanyRolesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompanySizeArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryCompanySizesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CompanySizesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCustomerFunnelStageArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryCustomerFunnelStagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  dashboardId: Scalars['UUID']['input'];
  filters?: InputMaybe<CustomerFunnelStagesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDashboardArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryDashboardAcquisitionPerformanceArgs = {
  channel?: InputMaybe<Channels>;
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  funnelStageName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDashboardActivityGoalArgs = {
  dashboardId: Scalars['UUID']['input'];
  isFromCache?: Scalars['Boolean']['input'];
};


export type QueryDashboardBudgetArgs = {
  dashboardId: Scalars['UUID']['input'];
  isFromCache?: Scalars['Boolean']['input'];
};


export type QueryDashboardCampaignsListArgs = {
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
  skip?: Scalars['Int']['input'];
  sorting: CampaignSorting;
  status: CampaignStatusInput;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDashboardChannelPerformanceArgs = {
  channelPerformanceSorting: ChannelPerformanceSorting;
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
};


export type QueryDashboardCustomerJourneyArgs = {
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
};


export type QueryDashboardOverviewArgs = {
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
};


export type QueryDashboardWebsiteActivityArgs = {
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  isFromCache?: Scalars['Boolean']['input'];
  pageViewsSorting: PageViewsSorting;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDashboardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<DashboardsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEventArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<EventsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
  websiteId: Scalars['UUID']['input'];
};


export type QueryExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryExpensesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<ExpensesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFunnelPerformanceDeepDiveArgs = {
  customerFunnelId: Scalars['UUID']['input'];
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  funnelPerformanceSorting: FunnelPerformanceSorting;
  isFromCache?: Scalars['Boolean']['input'];
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFunnelPerformanceDeepDiveConversionDetailsArgs = {
  customerFunnelId: Scalars['UUID']['input'];
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  firstPageVisited: Scalars['String']['input'];
  skip?: Scalars['Int']['input'];
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGeneratePixelScriptArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryGetCustomerFunnelStagesWithConditionsArgs = {
  dashboardId: Scalars['UUID']['input'];
  isFromCache?: Scalars['Boolean']['input'];
};


export type QueryIsHubspotConnectedArgs = {
  websiteId: Scalars['UUID']['input'];
};


export type QueryIsWebsiteConnectedArgs = {
  websiteId: Scalars['UUID']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<NotificationsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryOrganizationArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryOrganizationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<OrganizationsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryPermissionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<PermissionsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRegenerateCacheArgs = {
  dashboardIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  dashboardTimeframes: Array<DashboardTimeframe>;
  websiteIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
};


export type QuerySelectorsArgs = {
  websiteId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<UsersFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWebsiteArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryWebsitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<WebsitesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum RecurringRepeat {
  Annually = 'Annually',
  Monthly = 'Monthly',
  Weekly = 'Weekly'
}

export enum SalesforceIntegrationStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  OutOfSync = 'OUT_OF_SYNC'
}

export type Selector = {
  __typename?: 'Selector';
  createdAt: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  querySelector?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  websiteId: Scalars['UUID']['output'];
};

export type SendConnectionsRecommendationEmailInput = {
  requestedConnection: Scalars['String']['input'];
};

export type SendShareALinkSetupEmailInput = {
  recipients: Array<ShareALinkRecipients>;
  url: Scalars['String']['input'];
};

export type ShareALinkRecipients = {
  assignTo: Scalars['String']['input'];
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type Sorting = {
  field: Scalars['String']['input'];
  order: SortingOrder;
};

export enum SortingOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StageInfo = {
  __typename?: 'StageInfo';
  stageLabel: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  websiteCreated: Website;
  websiteUpdated: Website;
};


export type SubscriptionWebsiteCreatedArgs = {
  organizationId: Scalars['UUID']['input'];
};


export type SubscriptionWebsiteUpdatedArgs = {
  websiteId: Scalars['UUID']['input'];
};

export type UpdateActivityGoalInput = {
  customerFunnelStageId?: InputMaybe<Scalars['UUID']['input']>;
  dashboardId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
  numberOfEvents?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBudgetGoalInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  dashboardId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
  recurring?: InputMaybe<Scalars['Boolean']['input']>;
  recurringRepeat?: InputMaybe<RecurringRepeat>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCustomerFunnelStageInput = {
  customerFunnelStageEvents?: InputMaybe<Array<CreateCustomerFunnelStageEventInput>>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDashboardInput = {
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<ExpensesCategory>;
  channels?: InputMaybe<Array<Channels>>;
  dashboardId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  recurringRepeat?: InputMaybe<RecurringRepeat>;
};

export type UpdateNotificationInput = {
  id: Scalars['UUID']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  notificationType?: InputMaybe<NotificationType>;
  title?: InputMaybe<Scalars['String']['input']>;
  websiteId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateOrganizationInput = {
  companyIndustryId?: InputMaybe<Scalars['UUID']['input']>;
  companySizeId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermissionInput = {
  accessLevel: AccessLevel;
  id: Scalars['UUID']['input'];
};

export type UpdateUserInput = {
  companyRoleId?: InputMaybe<Scalars['UUID']['input']>;
  currentOnboardingPath?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWebsiteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pixelScriptGenerationStatus?: InputMaybe<PixelScriptGenerationStatus>;
  scriptUrl?: InputMaybe<Scalars['String']['input']>;
  snippetUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UploadOrganizationImageInput = {
  imageBase64: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
};

export type UploadUserImageInput = {
  imageBase64: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UploadWebsiteImageInput = {
  imageBase64: Scalars['String']['input'];
  websiteId: Scalars['String']['input'];
};

export type UpsertCustomerFunnelStageInput = {
  dashboardId: Scalars['UUID']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertSelectorInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  querySelector?: InputMaybe<Scalars['String']['input']>;
  websiteId: Scalars['UUID']['input'];
};

export enum UrlCondition {
  EndsWith = 'ENDS_WITH',
  Equal = 'EQUAL',
  Includes = 'INCLUDES',
  Matches = 'MATCHES',
  StartsWith = 'STARTS_WITH'
}

export type User = {
  __typename?: 'User';
  companyRoleId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  currentOnboardingPath?: Maybe<Scalars['String']['output']>;
  defaultOrganizationId?: Maybe<Scalars['UUID']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UsersFiltersInput = {
  companyIndustryId?: InputMaybe<Filters>;
  companyName?: InputMaybe<Filters>;
  companyRoleId?: InputMaybe<Filters>;
  companySizeId?: InputMaybe<Filters>;
  createdAt?: InputMaybe<Filters>;
  email?: InputMaybe<Filters>;
  firstName?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  lastName?: InputMaybe<Filters>;
  sub?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export enum VisitorType {
  NewAndReturning = 'NEW_AND_RETURNING',
  Unique = 'UNIQUE'
}

export type Website = {
  __typename?: 'Website';
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<Scalars['UUID']['output']>;
  defaultDashboardId?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  events: Array<Event>;
  googleAdsIntegrationStatus?: Maybe<GoogleAdsIntegrationStatus>;
  hubspotAppId?: Maybe<Scalars['Float']['output']>;
  hubspotIntegrationStatus?: Maybe<HubspotIntegrationStatus>;
  id: Scalars['UUID']['output'];
  imageUrl: Scalars['String']['output'];
  metaAdsIntegrationStatus?: Maybe<MetaAdsIntegrationStatus>;
  name?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  organizationId: Scalars['UUID']['output'];
  pixelScriptGenerationStatus?: Maybe<PixelScriptGenerationStatus>;
  salesforceIntegrationStatus?: Maybe<SalesforceIntegrationStatus>;
  scriptUrl?: Maybe<Scalars['String']['output']>;
  snippetUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  user: User;
};

export type WebsiteConnection = {
  __typename?: 'WebsiteConnection';
  edges: Array<WebsiteEdge>;
  pageInfo: PageInfo;
};

export type WebsiteEdge = {
  __typename?: 'WebsiteEdge';
  cursor: Scalars['String']['output'];
  node: Website;
};

export type WebsitesFiltersInput = {
  createdAt?: InputMaybe<Filters>;
  description?: InputMaybe<Filters>;
  domain?: InputMaybe<Filters>;
  id?: InputMaybe<Filters>;
  organizationId?: InputMaybe<Filters>;
  scriptUrl?: InputMaybe<Filters>;
  snippetUrl?: InputMaybe<Filters>;
  updatedAt?: InputMaybe<Filters>;
};

export type CreateActivityGoalMutationMutationVariables = Exact<{
  createActivityGoalInput: CreateActivityGoalInput;
}>;


export type CreateActivityGoalMutationMutation = { __typename?: 'Mutation', createActivityGoal: { __typename?: 'ActivityGoal', dashboardId: string, numberOfEvents: number } };

export type CreateBudgetGoalMutationMutationVariables = Exact<{
  createBudgetGoalInput: CreateBudgetGoalInput;
}>;


export type CreateBudgetGoalMutationMutation = { __typename?: 'Mutation', createBudgetGoal: { __typename?: 'BudgetGoal', id: string, dashboardId: string, value: number, currency: string, recurring: boolean, recurringRepeat?: RecurringRepeat | null, createdAt: string, updatedAt: string } };

export type CreateDashboardMutationMutationVariables = Exact<{
  createDashboardInput: CreateDashboardInput;
}>;


export type CreateDashboardMutationMutation = { __typename?: 'Mutation', createDashboard: { __typename?: 'Dashboard', id: string, name: string, createdAt: string, updatedAt: string } };

export type CreateExpenseMutationVariables = Exact<{
  createExpenseInput: CreateExpenseInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: { __typename?: 'Expense', amount: number, category?: ExpensesCategory | null, createdAt: string, dashboardId: string, id: string, name: string, recurringRepeat?: RecurringRepeat | null, updatedAt: string } };

export type CreateCustomerFunnelStageMutationVariables = Exact<{
  createCustomerFunnelStageInput: Array<CreateCustomerFunnelStageInput> | CreateCustomerFunnelStageInput;
}>;


export type CreateCustomerFunnelStageMutation = { __typename?: 'Mutation', createCustomerFunnelStage: Array<{ __typename?: 'CustomerFunnelStage', dashboardId: string, id: string }> };

export type CreateOrganizationMutationVariables = Exact<{
  createOrganizationInput: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, userId: string, name: string } };

export type CreatePermissionMutationVariables = Exact<{
  createPermissionInput: CreatePermissionInput;
}>;


export type CreatePermissionMutation = { __typename?: 'Mutation', createPermission: Array<{ __typename?: 'Permission', id: string }> };

export type CreateWebsiteMutationVariables = Exact<{
  createWebsiteInput: CreateWebsiteInput;
}>;


export type CreateWebsiteMutation = { __typename?: 'Mutation', createWebsite: { __typename?: 'Website', organizationId: string, name?: string | null, domain?: string | null, id: string } };

export type DeleteOrganizationImageMutationVariables = Exact<{
  deleteOrganizationImageInput: DeleteOrganizationImageInput;
}>;


export type DeleteOrganizationImageMutation = { __typename?: 'Mutation', deleteOrganizationImage: { __typename?: 'Organization', id: string } };

export type DeleteUserImageMutationVariables = Exact<{
  deleteUserImageInput: DeleteUserImageInput;
}>;


export type DeleteUserImageMutation = { __typename?: 'Mutation', deleteUserImage: { __typename?: 'User', id: string } };

export type DeleteWebsiteImageMutationVariables = Exact<{
  deleteWebsiteImageInput: DeleteWebsiteImageInput;
}>;


export type DeleteWebsiteImageMutation = { __typename?: 'Mutation', deleteWebsiteImage: { __typename?: 'Website', id: string } };

export type UpdatePermissionMutationVariables = Exact<{
  updatePermissionInput: UpdatePermissionInput;
}>;


export type UpdatePermissionMutation = { __typename?: 'Mutation', updatePermission: { __typename?: 'Permission', id: string } };

export type SendConnectionsRecommendationEmailMutationVariables = Exact<{
  sendConnectionsRecommendationEmailInput: SendConnectionsRecommendationEmailInput;
}>;


export type SendConnectionsRecommendationEmailMutation = { __typename?: 'Mutation', sendConnectionsRecommendationEmail: boolean };

export type SendShareALinkSetupEmailMutationVariables = Exact<{
  sendShareALinkSetupEmailInput: SendShareALinkSetupEmailInput;
}>;


export type SendShareALinkSetupEmailMutation = { __typename?: 'Mutation', sendShareALinkSetupEmail: boolean };

export type RemoveActivityGoalMutationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveActivityGoalMutationMutation = { __typename?: 'Mutation', removeActivityGoal: string };

export type RemoveBudgetGoalMutationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveBudgetGoalMutationMutation = { __typename?: 'Mutation', removeBudgetGoal: string };

export type RemoveDashboardMutationVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
}>;


export type RemoveDashboardMutation = { __typename?: 'Mutation', removeDashboard: string };

export type RemovePermissionsMutationVariables = Exact<{
  removePermissionId: Scalars['UUID']['input'];
}>;


export type RemovePermissionsMutation = { __typename?: 'Mutation', removePermission: string };

export type RemoveWebsiteMutationVariables = Exact<{
  websiteId: Scalars['UUID']['input'];
}>;


export type RemoveWebsiteMutation = { __typename?: 'Mutation', removeWebsite: string };

export type SetCurrentOnboardingPathMutationVariables = Exact<{
  currentOnboardingPath?: InputMaybe<Scalars['String']['input']>;
}>;


export type SetCurrentOnboardingPathMutation = { __typename?: 'Mutation', setCurrentOnboardingPath: { __typename?: 'User', id: string, currentOnboardingPath?: string | null, createdAt: string, updatedAt: string } };

export type UpdateActivityGoalMutationMutationVariables = Exact<{
  updateActivityGoalInput: UpdateActivityGoalInput;
}>;


export type UpdateActivityGoalMutationMutation = { __typename?: 'Mutation', updateActivityGoal: { __typename?: 'ActivityGoal', customerFunnelStageId: string, dashboardId: string, id: string, numberOfEvents: number } };

export type MutationMutationVariables = Exact<{
  updateBudgetGoalInput: UpdateBudgetGoalInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', updateBudgetGoal: { __typename?: 'BudgetGoal', recurring: boolean, currency: string, dashboardId: string, id: string, recurringRepeat?: RecurringRepeat | null, value: number } };

export type UpdateDashboardMutationVariables = Exact<{
  updateDashboardInput: UpdateDashboardInput;
}>;


export type UpdateDashboardMutation = { __typename?: 'Mutation', updateDashboard: { __typename?: 'Dashboard', id: string, name: string, websiteId: string, createdAt: string, updatedAt: string } };

export type UpdateFunnelStageMutationVariables = Exact<{
  updateCustomerFunnelStageInput: UpdateCustomerFunnelStageInput;
}>;


export type UpdateFunnelStageMutation = { __typename?: 'Mutation', updateCustomerFunnelStage: { __typename?: 'CustomerFunnelStage', dashboardId: string, id: string, name: string, createdAt: string, updatedAt: string, customerFunnelStageEvents?: Array<{ __typename?: 'CustomerFunnelStageEvent', id: string, customerFunnelStageId: string, name: string, eventType: EventType, customerFunnelStageEventConditions?: Array<{ __typename?: 'CustomerFunnelStageEventCondition', id: string, customerFunnelStageEventId: string, pageUrl?: string | null, visitorType?: VisitorType | null, startingUrl?: string | null, startingUrlCondition?: UrlCondition | null, destinationUrl?: string | null, destinationUrlCondition?: UrlCondition | null }> | null }> | null } };

export type UpdateOrganizationMutationVariables = Exact<{
  updateOrganizationInput: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, userId: string, name: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, companyRoleId?: string | null, createdAt: string, updatedAt: string } };

export type UpdateWebsiteMutationVariables = Exact<{
  updateWebsiteInput: UpdateWebsiteInput;
}>;


export type UpdateWebsiteMutation = { __typename?: 'Mutation', updateWebsite: { __typename?: 'Website', id: string, organizationId: string, name?: string | null, domain?: string | null, description?: string | null } };

export type UploadOrganizationImageMutationVariables = Exact<{
  uploadOrganizationImageInput: UploadOrganizationImageInput;
}>;


export type UploadOrganizationImageMutation = { __typename?: 'Mutation', uploadOrganizationImage: { __typename?: 'Organization', id: string, imageUrl: string } };

export type UploadUserImageMutationVariables = Exact<{
  uploadUserImageInput: UploadUserImageInput;
}>;


export type UploadUserImageMutation = { __typename?: 'Mutation', uploadUserImage: { __typename?: 'User', id: string, imageUrl?: string | null } };

export type UploadWebsiteImageMutationVariables = Exact<{
  uploadWebsiteImageInput: UploadWebsiteImageInput;
}>;


export type UploadWebsiteImageMutation = { __typename?: 'Mutation', uploadWebsiteImage: { __typename?: 'Website', id: string, imageUrl: string } };

export type UpsertCustomerFunnelStageMutationVariables = Exact<{
  upsertCustomerFunnelStageInput: Array<UpsertCustomerFunnelStageInput> | UpsertCustomerFunnelStageInput;
}>;


export type UpsertCustomerFunnelStageMutation = { __typename?: 'Mutation', upsertCustomerFunnelStage: Array<{ __typename?: 'CustomerFunnelStage', id: string, name: string, dashboardId: string }> };

export type UpsertSelectorMutationVariables = Exact<{
  upsertSelectorSelectors: Array<UpsertSelectorInput> | UpsertSelectorInput;
}>;


export type UpsertSelectorMutation = { __typename?: 'Mutation', upsertSelector: Array<{ __typename?: 'Selector', link?: string | null, querySelector?: string | null, websiteId: string }> };

export type GetAccountOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountOptionsQuery = { __typename?: 'Query', companyRoles: { __typename?: 'CompanyRoleConnection', edges: Array<{ __typename?: 'CompanyRoleEdge', node: { __typename?: 'CompanyRole', id: string, name: string, createdAt: string } }> }, companyIndustries: { __typename?: 'CompanyIndustryConnection', edges: Array<{ __typename?: 'CompanyIndustryEdge', node: { __typename?: 'CompanyIndustry', id: string, name: string, createdAt: string } }> }, companySizes: { __typename?: 'CompanySizeConnection', edges: Array<{ __typename?: 'CompanySizeEdge', node: { __typename?: 'CompanySize', id: string, name: string, createdAt: string } }> } };

export type CampaignPerformanceDeepDiveOverviewQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  campaignName: Scalars['String']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
  campaignPerformanceSorting?: InputMaybe<CampaignPerformanceSorting>;
  isFromCache: Scalars['Boolean']['input'];
}>;


export type CampaignPerformanceDeepDiveOverviewQuery = { __typename?: 'Query', campaignPerformanceDeepDiveOverview: { __typename?: 'CampaignPerformance', totalVisits: number, totalSpend: number, topPerformer?: string | null, totalActivity: number, firstStageTotals: { __typename?: 'StageInfo', total: number, stageLabel: string }, lastStageTotals: { __typename?: 'StageInfo', total: number, stageLabel: string }, activity: Array<{ __typename?: 'ActivityInfo', sourceUrl: string, firstPageVisited: string, leadConversion: number, customerConversion: number }>, cpc: { __typename?: 'ConversionCost', cost: number, label: string }, cpl: { __typename?: 'ConversionCost', cost: number, label: string } } };

export type GetChannelPerformanceDeepDiveActivityDetailsQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
  channelName: ChannelFiltersDashboardEnum;
  dashboardTimeframe: DashboardTimeframe;
  skip: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetChannelPerformanceDeepDiveActivityDetailsQuery = { __typename?: 'Query', channelPerformanceDeepDiveActivityDetails: { __typename?: 'ChannelPerformanceDeepDiveActivityDetails', totalActivityDetails: number, activityDetails: Array<{ __typename?: 'ChannelPerformanceActivityDetails', id: string, region?: string | null, pageUrl?: string | null, email?: string | null, searchTerm?: string | null, customerFunnelStageName?: string | null }> } };

export type GetChannelPerformanceDeepDiveCampaignsQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
  channelName: ChannelFiltersDashboardEnum;
  dashboardTimeframe: DashboardTimeframe;
}>;


export type GetChannelPerformanceDeepDiveCampaignsQuery = { __typename?: 'Query', channelPerformanceDeepDiveCampaigns: { __typename?: 'ChannelPerformanceDeepDiveCampaigns', campaigns?: Array<{ __typename?: 'ChannelPerformanceCampaign', name: string, customerFunnels: Array<{ __typename?: 'ChannelCampaignsCustomerFunnel', name: string, count: number }> }> | null } };

export type GetChannelPerformanceDeepDiveOverviewQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
  channelName: ChannelFiltersDashboardEnum;
  dashboardTimeframe: DashboardTimeframe;
}>;


export type GetChannelPerformanceDeepDiveOverviewQuery = { __typename?: 'Query', channelPerformanceDeepDiveOverview: { __typename?: 'ChannelPerformanceDeepDiveOverview', currency: string, spend: number, customerFunnelsOverView: Array<{ __typename?: 'CustomerFunnelOverview', name: string, organicCount?: number | null, paidCount?: number | null, totalCount: number, costPer: number, currency: string }> } };

export type DashboardAcquisitionPerformanceQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  funnelStageName?: InputMaybe<Scalars['String']['input']>;
  channel?: InputMaybe<Channels>;
}>;


export type DashboardAcquisitionPerformanceQuery = { __typename?: 'Query', dashboardAcquisitionPerformance: { __typename?: 'DashboardAcquisitionPerformance', startDate: string, isSetup: boolean, endDate: string, acquisitionPerformance: Array<{ __typename?: 'AcquisitionPerformance', date: string, count: number }> } };

export type GetDashboardActivityQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
}>;


export type GetDashboardActivityQuery = { __typename?: 'Query', dashboardActivityGoal: { __typename?: 'DashboardActivityGoal', dashboardId: string, totalNumberOfEvents: number, currentNumberOfEvents: number, completesInDays: number, isSetup: boolean, customerFunnelStageName: string, activityGoalProgress: Array<{ __typename?: 'ChartData', date: string, value?: number | null }> } };

export type GetDashboardBudgetQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
}>;


export type GetDashboardBudgetQuery = { __typename?: 'Query', dashboardBudget: { __typename?: 'DashboardBudget', dashboardId: string, totalAmount: number, usedAmount: number, currency: string, recurring: boolean, recurringRepeat?: RecurringRepeat | null, renewsIn?: number | null, isSetup: boolean, budgetUsage: Array<{ __typename?: 'BudgetUsage', date: string, amount?: number | null }> } };

export type GetDashboardCampaignsQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  status: CampaignStatusInput;
  sorting: CampaignSorting;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDashboardCampaignsQuery = { __typename?: 'Query', dashboardCampaignsList: { __typename?: 'DashboardCampaignsList', hasEvents: boolean, totalVisits: number, totalConversions: number, totalCampaigns: number, campaigns: Array<{ __typename?: 'DashboardCampaign', name: string, status: CampaignStatus, startDate: string, endDate: string, visits: number, spend: number, cac: number, currency: string, urlSourcesImages: Array<string>, leads: { __typename?: 'DashboardCustomerFunnel', name: string, count: number }, customers: { __typename?: 'DashboardCustomerFunnel', name: string, count: number } }> } };

export type GetDashboardChanelPerformanceQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  channelPerformanceSorting: ChannelPerformanceSorting;
}>;


export type GetDashboardChanelPerformanceQuery = { __typename?: 'Query', dashboardChannelPerformance: { __typename?: 'DashboardChannelPerformance', hasEvents: boolean, isSetup: boolean, channelsPerformance: Array<{ __typename?: 'ChannelPerformance', stageName: string, name: string, count: number, stageId: string, channels: Array<{ __typename?: 'ChannelPerformanceCardSummary', name: Channels, currency: string, count: number, spend: number, perStage: number }> }> } };

export type GetDashboardCustomerJourneyQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
}>;


export type GetDashboardCustomerJourneyQuery = { __typename?: 'Query', dashboardCustomerJourney: { __typename?: 'DashboardCustomerJourney', dashboardId: string, hasEvents: boolean, isSetup: boolean, period: DashboardTimeframe, journeys: Array<{ __typename?: 'Journey', id: string, name: string, conversionEvents: number, conversionEventsPercentage: number, events?: Array<{ __typename?: 'JourneyEvents', id: string, name: string }> | null }> } };

export type GetOrganizationQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', id: string, defaultWebsiteId?: string | null, companyIndustryId?: string | null, name: string, companySizeId?: string | null, imageUrl: string, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null, id: string, email: string } } };

export type GetDashboardOverviewQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
}>;


export type GetDashboardOverviewQuery = { __typename?: 'Query', dashboardOverview: { __typename?: 'DashboardOverview', startDate: string, endDate: string, conversion: number, cac: number, websiteConversionRate: number, cacCurrency: string, status: DashboardOverviewStatus, isSetup: boolean, hasEvents: boolean, leads: { __typename?: 'DashboardCustomerFunnel', count: number, name: string }, newCustomers: { __typename?: 'DashboardCustomerFunnel', count: number, name: string } } };

export type GetDashboardWebsiteActivityQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  dashboardTimeframe: DashboardTimeframe;
  pageViewsSorting: PageViewsSorting;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDashboardWebsiteActivityQuery = { __typename?: 'Query', dashboardWebsiteActivity: { __typename?: 'DashboardWebsiteActivity', domain?: string | null, websiteImageUrl: string, conversionRate: number, totalSources: number, hasEvents: boolean, pageViews: Array<{ __typename?: 'DashboardWebsiteActivityPageViews', page: string, views: number, conversions: number }>, sources: Array<{ __typename?: 'DashboardWebsiteActivitySources', name: string, imageUrl: string, conversions: number }>, traffic: Array<{ __typename?: 'DashboardWebsiteActivityTraffic', pageViews?: number | null, date: string }> } };

export type GetWebsitesQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  filters?: InputMaybe<WebsitesFiltersInput>;
}>;


export type GetWebsitesQuery = { __typename?: 'Query', websites: { __typename?: 'WebsiteConnection', edges: Array<{ __typename?: 'WebsiteEdge', node: { __typename?: 'Website', id: string, name?: string | null, defaultDashboardId?: string | null, imageUrl: string } }> } };

export type GetDashboardQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
}>;


export type GetDashboardQuery = { __typename?: 'Query', dashboard: { __typename?: 'Dashboard', id: string, websiteId: string, name: string, createdAt: string, updatedAt: string } };

export type GetDashboardsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  sorting?: InputMaybe<Sorting>;
  filters?: InputMaybe<DashboardsFiltersInput>;
}>;


export type GetDashboardsQuery = { __typename?: 'Query', dashboards: { __typename?: 'DashboardConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'DashboardEdge', cursor: string, node: { __typename?: 'Dashboard', id: string, websiteId: string, name: string, createdAt: string, updatedAt: string } }> } };

export type FunnelPerformanceDeepDiveConversionDetailsQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
  firstPageVisited: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  customerFunnelId: Scalars['UUID']['input'];
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
}>;


export type FunnelPerformanceDeepDiveConversionDetailsQuery = { __typename?: 'Query', funnelPerformanceDeepDiveConversionDetails: { __typename?: 'FunnelPerformanceConversionDetails', totalFunnelPerformanceConversionEvents: number, totalSearchTerms: number, funnelName: string, funnelPerformanceConversionEvents: Array<{ __typename?: 'FunnelPerformanceConversionEvents', region?: string | null, email?: string | null, firstPageVisited?: string | null, searchTerm?: string | null, channel?: string | null, timestamp?: string | null }> } };

export type FunnelPerformanceDeepDiveQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
  dashboardTimeframe: DashboardTimeframe;
  customerFunnelId: Scalars['UUID']['input'];
  isFromCache: Scalars['Boolean']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
  funnelPerformanceSorting: FunnelPerformanceSorting;
}>;


export type FunnelPerformanceDeepDiveQuery = { __typename?: 'Query', funnelPerformanceDeepDive: { __typename?: 'FunnelPerformanceDeepDive', totalEvents: number, totalConversions: number, funnelName: string, totalFunnelPerformanceConversions: number, funnelPerformanceConversions: Array<{ __typename?: 'FunnelPerformanceConversion', sourceUrl?: string | null, urlSourceImage?: string | null, firstPageVisited?: string | null, conversions: number }> } };

export type GeneratePixelScriptQueryVariables = Exact<{
  websiteId: Scalars['UUID']['input'];
}>;


export type GeneratePixelScriptQuery = { __typename?: 'Query', generatePixelScript: string };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, email: string, firstName?: string | null, lastName?: string | null, companyRoleId?: string | null, companyIndustryId?: string | null, companySizeId?: string | null, defaultOrganizationId?: string | null, currentOnboardingPath?: string | null, createdAt: string, updatedAt: string, imageUrl?: string | null, permissions?: Array<{ __typename?: 'MePermission', organizationId?: string | null, accessLevel: string, dashboardId?: string | null, websiteId?: string | null }> | null } };

export type GetFunnelStagesQueryVariables = Exact<{
  dashboardId: Scalars['UUID']['input'];
  first: Scalars['Int']['input'];
}>;


export type GetFunnelStagesQuery = { __typename?: 'Query', customerFunnelStages: { __typename?: 'CustomerFunnelStageConnection', edges: Array<{ __typename?: 'CustomerFunnelStageEdge', node: { __typename?: 'CustomerFunnelStage', id: string, name: string } }> } };

export type GetOnboardingGoalsQueryVariables = Exact<{
  dashboardId: Scalars['String']['input'];
}>;


export type GetOnboardingGoalsQuery = { __typename?: 'Query', activityGoals: { __typename?: 'ActivityGoalConnection', edges: Array<{ __typename?: 'ActivityGoalEdge', node: { __typename?: 'ActivityGoal', id: string, numberOfEvents: number, customerFunnelStageId: string } }> }, budgetGoals: { __typename?: 'BudgetGoalConnection', edges: Array<{ __typename?: 'BudgetGoalEdge', node: { __typename?: 'BudgetGoal', id: string, currency: string, recurring: boolean, value: number, recurringRepeat?: RecurringRepeat | null } }> } };

export type GetOrganizationsQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<Sorting>;
  filters?: InputMaybe<OrganizationsFiltersInput>;
}>;


export type GetOrganizationsQuery = { __typename?: 'Query', organizations: { __typename?: 'OrganizationConnection', edges: Array<{ __typename?: 'OrganizationEdge', node: { __typename?: 'Organization', id: string, name: string, companySizeId?: string | null, companyIndustryId?: string | null, imageUrl: string, defaultWebsiteId?: string | null, website?: { __typename?: 'Website', defaultDashboardId?: string | null } | null } }> } };

export type GetStageQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetStageQuery = { __typename?: 'Query', customerFunnelStage: { __typename?: 'CustomerFunnelStage', id: string, dashboardId: string, name: string, createdAt: string, updatedAt: string, customerFunnelStageEvents?: Array<{ __typename?: 'CustomerFunnelStageEvent', id: string, customerFunnelStageId: string, name: string, eventType: EventType, customerFunnelStageEventConditions?: Array<{ __typename?: 'CustomerFunnelStageEventCondition', id: string, customerFunnelStageEventId: string, pageUrl?: string | null, visitorType?: VisitorType | null, startingUrl?: string | null, startingUrlCondition?: UrlCondition | null, destinationUrl?: string | null, destinationUrlCondition?: UrlCondition | null }> | null }> | null } };

export type GetOrganizationPermissionsQueryVariables = Exact<{
  filters?: InputMaybe<PermissionsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  sorting?: InputMaybe<Sorting>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetOrganizationPermissionsQuery = { __typename?: 'Query', permissions: { __typename?: 'PermissionConnection', totalTeamMembers: number, edges: Array<{ __typename?: 'PermissionEdge', node: { __typename?: 'Permission', id: string, invitationStatus: MembersInvitationStatus, accessLevel: string, userId: string, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } } }> } };

export type IsWebsiteConnectedQueryVariables = Exact<{
  websiteId: Scalars['UUID']['input'];
}>;


export type IsWebsiteConnectedQuery = { __typename?: 'Query', isWebsiteConnected: boolean };

export type IsHubspotConnectedQueryVariables = Exact<{
  websiteId: Scalars['UUID']['input'];
}>;


export type IsHubspotConnectedQuery = { __typename?: 'Query', isHubspotConnected?: HubspotIntegrationStatus | null };

export type GetNotificationsQueryVariables = Exact<{
  websiteId: Scalars['String']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'NotificationEdge', cursor: string, node: { __typename?: 'Notification', id: string, websiteId: string, notificationType: NotificationType, title: string, message: string, createdAt: string, updatedAt: string } }> } };

export type SelectorsQueryVariables = Exact<{
  websiteId: Scalars['String']['input'];
}>;


export type SelectorsQuery = { __typename?: 'Query', selectors: Array<{ __typename?: 'Selector', createdAt: string, id: string, link?: string | null, querySelector?: string | null, updatedAt: string, websiteId: string }> };

export type GetWebsiteQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetWebsiteQuery = { __typename?: 'Query', website: { __typename?: 'Website', organizationId: string, snippetUrl?: string | null, domain?: string | null, id: string, name?: string | null, description?: string | null, scriptUrl?: string | null, imageUrl: string, pixelScriptGenerationStatus?: PixelScriptGenerationStatus | null, defaultDashboardId?: string | null, createdAt: string, updatedAt: string, hubspotIntegrationStatus?: HubspotIntegrationStatus | null, salesforceIntegrationStatus?: SalesforceIntegrationStatus | null, metaAdsIntegrationStatus?: MetaAdsIntegrationStatus | null, googleAdsIntegrationStatus?: GoogleAdsIntegrationStatus | null, organization: { __typename?: 'Organization', name: string }, user: { __typename?: 'User', firstName?: string | null, lastName?: string | null } } };

export type WebsiteUpdatedSubscriptionVariables = Exact<{
  websiteId: Scalars['UUID']['input'];
}>;


export type WebsiteUpdatedSubscription = { __typename?: 'Subscription', websiteUpdated: { __typename?: 'Website', id: string, organizationId: string, name?: string | null, domain?: string | null, description?: string | null, snippetUrl?: string | null, scriptUrl?: string | null, imageUrl: string, pixelScriptGenerationStatus?: PixelScriptGenerationStatus | null, createdAt: string, updatedAt: string } };


export const CreateActivityGoalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateActivityGoalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createActivityGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateActivityGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createActivityGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createActivityGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createActivityGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfEvents"}}]}}]}}]} as unknown as DocumentNode<CreateActivityGoalMutationMutation, CreateActivityGoalMutationMutationVariables>;
export const CreateBudgetGoalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBudgetGoalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBudgetGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBudgetGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBudgetGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBudgetGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBudgetGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurringRepeat"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateBudgetGoalMutationMutation, CreateBudgetGoalMutationMutationVariables>;
export const CreateDashboardMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDashboardMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createDashboardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDashboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createDashboardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createDashboardInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateDashboardMutationMutation, CreateDashboardMutationMutationVariables>;
export const CreateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createExpenseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpenseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createExpenseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createExpenseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recurringRepeat"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const CreateCustomerFunnelStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCustomerFunnelStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCustomerFunnelStageInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCustomerFunnelStageInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCustomerFunnelStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCustomerFunnelStageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCustomerFunnelStageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCustomerFunnelStageMutation, CreateCustomerFunnelStageMutationVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const CreatePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPermissionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePermissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPermissionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPermissionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePermissionMutation, CreatePermissionMutationVariables>;
export const CreateWebsiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWebsite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createWebsiteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWebsiteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWebsite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createWebsiteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createWebsiteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWebsiteMutation, CreateWebsiteMutationVariables>;
export const DeleteOrganizationImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganizationImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationImageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOrganizationImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganizationImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteOrganizationImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteOrganizationImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOrganizationImageMutation, DeleteOrganizationImageMutationVariables>;
export const DeleteUserImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUserImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserImageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteUserImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteUserImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserImageMutation, DeleteUserImageMutationVariables>;
export const DeleteWebsiteImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWebsiteImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteWebsiteImageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteWebsiteImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWebsiteImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteWebsiteImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteWebsiteImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWebsiteImageMutation, DeleteWebsiteImageMutationVariables>;
export const UpdatePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePermissionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePermissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePermissionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePermissionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePermissionMutation, UpdatePermissionMutationVariables>;
export const SendConnectionsRecommendationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendConnectionsRecommendationEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendConnectionsRecommendationEmailInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendConnectionsRecommendationEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendConnectionsRecommendationEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendConnectionsRecommendationEmailInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendConnectionsRecommendationEmailInput"}}}]}]}}]} as unknown as DocumentNode<SendConnectionsRecommendationEmailMutation, SendConnectionsRecommendationEmailMutationVariables>;
export const SendShareALinkSetupEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendShareALinkSetupEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendShareALinkSetupEmailInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendShareALinkSetupEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendShareALinkSetupEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendShareALinkSetupEmailInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendShareALinkSetupEmailInput"}}}]}]}}]} as unknown as DocumentNode<SendShareALinkSetupEmailMutation, SendShareALinkSetupEmailMutationVariables>;
export const RemoveActivityGoalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveActivityGoalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeActivityGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveActivityGoalMutationMutation, RemoveActivityGoalMutationMutationVariables>;
export const RemoveBudgetGoalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBudgetGoalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBudgetGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveBudgetGoalMutationMutation, RemoveBudgetGoalMutationMutationVariables>;
export const RemoveDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeDashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}}]}]}}]} as unknown as DocumentNode<RemoveDashboardMutation, RemoveDashboardMutationVariables>;
export const RemovePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removePermissionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removePermissionId"}}}]}]}}]} as unknown as DocumentNode<RemovePermissionsMutation, RemovePermissionsMutationVariables>;
export const RemoveWebsiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveWebsite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeWebsite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}]}]}}]} as unknown as DocumentNode<RemoveWebsiteMutation, RemoveWebsiteMutationVariables>;
export const SetCurrentOnboardingPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCurrentOnboardingPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentOnboardingPath"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setCurrentOnboardingPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentOnboardingPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentOnboardingPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentOnboardingPath"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SetCurrentOnboardingPathMutation, SetCurrentOnboardingPathMutationVariables>;
export const UpdateActivityGoalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateActivityGoalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateActivityGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateActivityGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateActivityGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateActivityGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateActivityGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageId"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfEvents"}}]}}]}}]} as unknown as DocumentNode<UpdateActivityGoalMutationMutation, UpdateActivityGoalMutationMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBudgetGoalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBudgetGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBudgetGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBudgetGoalInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBudgetGoalInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recurring"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recurringRepeat"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UpdateDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateDashboardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDashboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateDashboardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateDashboardInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateDashboardMutation, UpdateDashboardMutationVariables>;
export const UpdateFunnelStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFunnelStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCustomerFunnelStageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCustomerFunnelStageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomerFunnelStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCustomerFunnelStageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCustomerFunnelStageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageEventConditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageEventId"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visitorType"}},{"kind":"Field","name":{"kind":"Name","value":"startingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"startingUrlCondition"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrlCondition"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateFunnelStageMutation, UpdateFunnelStageMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganizationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOrganizationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"companyRoleId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateWebsiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWebsite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateWebsiteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWebsiteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWebsite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateWebsiteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateWebsiteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateWebsiteMutation, UpdateWebsiteMutationVariables>;
export const UploadOrganizationImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadOrganizationImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadOrganizationImageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadOrganizationImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadOrganizationImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploadOrganizationImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadOrganizationImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<UploadOrganizationImageMutation, UploadOrganizationImageMutationVariables>;
export const UploadUserImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadUserImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadUserImageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadUserImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadUserImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploadUserImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadUserImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<UploadUserImageMutation, UploadUserImageMutationVariables>;
export const UploadWebsiteImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadWebsiteImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadWebsiteImageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadWebsiteImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadWebsiteImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploadWebsiteImageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadWebsiteImageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<UploadWebsiteImageMutation, UploadWebsiteImageMutationVariables>;
export const UpsertCustomerFunnelStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCustomerFunnelStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"upsertCustomerFunnelStageInput"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertCustomerFunnelStageInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCustomerFunnelStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"upsertCustomerFunnelStageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"upsertCustomerFunnelStageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}}]}}]}}]} as unknown as DocumentNode<UpsertCustomerFunnelStageMutation, UpsertCustomerFunnelStageMutationVariables>;
export const UpsertSelectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertSelector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"upsertSelectorSelectors"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertSelectorInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertSelector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"selectors"},"value":{"kind":"Variable","name":{"kind":"Name","value":"upsertSelectorSelectors"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"querySelector"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}}]}}]}}]} as unknown as DocumentNode<UpsertSelectorMutation, UpsertSelectorMutationVariables>;
export const GetAccountOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"StringValue","value":"name","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyIndustries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"StringValue","value":"name","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"companySizes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountOptionsQuery, GetAccountOptionsQueryVariables>;
export const CampaignPerformanceDeepDiveOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignPerformanceDeepDiveOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignPerformanceSorting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CampaignPerformanceSorting"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFromCache"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignPerformanceDeepDiveOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"campaignName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignName"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"campaignPerformanceSorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignPerformanceSorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFromCache"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFromCache"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalVisits"}},{"kind":"Field","name":{"kind":"Name","value":"totalSpend"}},{"kind":"Field","name":{"kind":"Name","value":"firstStageTotals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"stageLabel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastStageTotals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"stageLabel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topPerformer"}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstPageVisited"}},{"kind":"Field","name":{"kind":"Name","value":"leadConversion"}},{"kind":"Field","name":{"kind":"Name","value":"customerConversion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"cpc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cpl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<CampaignPerformanceDeepDiveOverviewQuery, CampaignPerformanceDeepDiveOverviewQueryVariables>;
export const GetChannelPerformanceDeepDiveActivityDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannelPerformanceDeepDiveActivityDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelFiltersDashboardEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelPerformanceDeepDiveActivityDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelName"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalActivityDetails"}},{"kind":"Field","name":{"kind":"Name","value":"activityDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"searchTerm"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageName"}}]}}]}}]}}]} as unknown as DocumentNode<GetChannelPerformanceDeepDiveActivityDetailsQuery, GetChannelPerformanceDeepDiveActivityDetailsQueryVariables>;
export const GetChannelPerformanceDeepDiveCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannelPerformanceDeepDiveCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelFiltersDashboardEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelPerformanceDeepDiveCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelName"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetChannelPerformanceDeepDiveCampaignsQuery, GetChannelPerformanceDeepDiveCampaignsQueryVariables>;
export const GetChannelPerformanceDeepDiveOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannelPerformanceDeepDiveOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelFiltersDashboardEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelPerformanceDeepDiveOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelName"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelsOverView"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organicCount"}},{"kind":"Field","name":{"kind":"Name","value":"paidCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"costPer"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spend"}}]}}]}}]} as unknown as DocumentNode<GetChannelPerformanceDeepDiveOverviewQuery, GetChannelPerformanceDeepDiveOverviewQueryVariables>;
export const DashboardAcquisitionPerformanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardAcquisitionPerformance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"funnelStageName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channel"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Channels"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardAcquisitionPerformance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"funnelStageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"funnelStageName"}}},{"kind":"Argument","name":{"kind":"Name","value":"channel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channel"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"acquisitionPerformance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardAcquisitionPerformanceQuery, DashboardAcquisitionPerformanceQueryVariables>;
export const GetDashboardActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardActivityGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"totalNumberOfEvents"}},{"kind":"Field","name":{"kind":"Name","value":"currentNumberOfEvents"}},{"kind":"Field","name":{"kind":"Name","value":"completesInDays"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageName"}},{"kind":"Field","name":{"kind":"Name","value":"activityGoalProgress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardActivityQuery, GetDashboardActivityQueryVariables>;
export const GetDashboardBudgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardBudget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardBudget"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"usedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"}},{"kind":"Field","name":{"kind":"Name","value":"recurringRepeat"}},{"kind":"Field","name":{"kind":"Name","value":"renewsIn"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"budgetUsage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardBudgetQuery, GetDashboardBudgetQueryVariables>;
export const GetDashboardCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CampaignStatusInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CampaignSorting"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardCampaignsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasEvents"}},{"kind":"Field","name":{"kind":"Name","value":"totalVisits"}},{"kind":"Field","name":{"kind":"Name","value":"totalConversions"}},{"kind":"Field","name":{"kind":"Name","value":"totalCampaigns"}},{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"visits"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spend"}},{"kind":"Field","name":{"kind":"Name","value":"cac"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"urlSourcesImages"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardCampaignsQuery, GetDashboardCampaignsQueryVariables>;
export const GetDashboardChanelPerformanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardChanelPerformance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelPerformanceSorting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelPerformanceSorting"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardChannelPerformance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelPerformanceSorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelPerformanceSorting"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelsPerformance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stageName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"spend"}},{"kind":"Field","name":{"kind":"Name","value":"perStage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasEvents"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}}]}}]}}]} as unknown as DocumentNode<GetDashboardChanelPerformanceQuery, GetDashboardChanelPerformanceQueryVariables>;
export const GetDashboardCustomerJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardCustomerJourney"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardCustomerJourney"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"journeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversionEvents"}},{"kind":"Field","name":{"kind":"Name","value":"conversionEventsPercentage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasEvents"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"period"}}]}}]}}]} as unknown as DocumentNode<GetDashboardCustomerJourneyQuery, GetDashboardCustomerJourneyQueryVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"defaultWebsiteId"}},{"kind":"Field","name":{"kind":"Name","value":"companyIndustryId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companySizeId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetDashboardOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversion"}},{"kind":"Field","name":{"kind":"Name","value":"cac"}},{"kind":"Field","name":{"kind":"Name","value":"websiteConversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"cacCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"newCustomers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isSetup"}},{"kind":"Field","name":{"kind":"Name","value":"hasEvents"}}]}}]}}]} as unknown as DocumentNode<GetDashboardOverviewQuery, GetDashboardOverviewQueryVariables>;
export const GetDashboardWebsiteActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardWebsiteActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageViewsSorting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageViewsSorting"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardWebsiteActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageViewsSorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageViewsSorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"websiteImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"conversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalSources"}},{"kind":"Field","name":{"kind":"Name","value":"hasEvents"}},{"kind":"Field","name":{"kind":"Name","value":"pageViews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"traffic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageViews"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardWebsiteActivityQuery, GetDashboardWebsiteActivityQueryVariables>;
export const GetWebsitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWebsites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sorting"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WebsitesFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"websites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"defaultDashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWebsitesQuery, GetWebsitesQueryVariables>;
export const GetDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetDashboardQuery, GetDashboardQueryVariables>;
export const GetDashboardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sorting"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardsFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardsQuery, GetDashboardsQueryVariables>;
export const FunnelPerformanceDeepDiveConversionDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FunnelPerformanceDeepDiveConversionDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstPageVisited"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerFunnelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sourceUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"funnelPerformanceDeepDiveConversionDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstPageVisited"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstPageVisited"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerFunnelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerFunnelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sourceUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sourceUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalFunnelPerformanceConversionEvents"}},{"kind":"Field","name":{"kind":"Name","value":"totalSearchTerms"}},{"kind":"Field","name":{"kind":"Name","value":"funnelName"}},{"kind":"Field","name":{"kind":"Name","value":"funnelPerformanceConversionEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstPageVisited"}},{"kind":"Field","name":{"kind":"Name","value":"searchTerm"}},{"kind":"Field","name":{"kind":"Name","value":"channel"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<FunnelPerformanceDeepDiveConversionDetailsQuery, FunnelPerformanceDeepDiveConversionDetailsQueryVariables>;
export const FunnelPerformanceDeepDiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FunnelPerformanceDeepDive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DashboardTimeframe"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerFunnelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFromCache"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"funnelPerformanceSorting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FunnelPerformanceSorting"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"funnelPerformanceDeepDive"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dashboardTimeframe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardTimeframe"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerFunnelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerFunnelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFromCache"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFromCache"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"funnelPerformanceSorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"funnelPerformanceSorting"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalEvents"}},{"kind":"Field","name":{"kind":"Name","value":"totalConversions"}},{"kind":"Field","name":{"kind":"Name","value":"funnelName"}},{"kind":"Field","name":{"kind":"Name","value":"totalFunnelPerformanceConversions"}},{"kind":"Field","name":{"kind":"Name","value":"funnelPerformanceConversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"urlSourceImage"}},{"kind":"Field","name":{"kind":"Name","value":"firstPageVisited"}},{"kind":"Field","name":{"kind":"Name","value":"conversions"}}]}}]}}]}}]} as unknown as DocumentNode<FunnelPerformanceDeepDiveQuery, FunnelPerformanceDeepDiveQueryVariables>;
export const GeneratePixelScriptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GeneratePixelScript"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePixelScript"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}]}]}}]} as unknown as DocumentNode<GeneratePixelScriptQuery, GeneratePixelScriptQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"companyRoleId"}},{"kind":"Field","name":{"kind":"Name","value":"companyIndustryId"}},{"kind":"Field","name":{"kind":"Name","value":"companySizeId"}},{"kind":"Field","name":{"kind":"Name","value":"defaultOrganizationId"}},{"kind":"Field","name":{"kind":"Name","value":"currentOnboardingPath"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"accessLevel"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetFunnelStagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFunnelStages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFunnelStagesQuery, GetFunnelStagesQueryVariables>;
export const GetOnboardingGoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOnboardingGoals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityGoals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfEvents"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"budgetGoals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"dashboardId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dashboardId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"recurringRepeat"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOnboardingGoalsQuery, GetOnboardingGoalsQueryVariables>;
export const GetOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sorting"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationsFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companySizeId"}},{"kind":"Field","name":{"kind":"Name","value":"companyIndustryId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"defaultWebsiteId"}},{"kind":"Field","name":{"kind":"Name","value":"website"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultDashboardId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationsQuery, GetOrganizationsQueryVariables>;
export const GetStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageEventConditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerFunnelStageEventId"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visitorType"}},{"kind":"Field","name":{"kind":"Name","value":"startingUrl"}},{"kind":"Field","name":{"kind":"Name","value":"startingUrlCondition"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrl"}},{"kind":"Field","name":{"kind":"Name","value":"destinationUrlCondition"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetStageQuery, GetStageQueryVariables>;
export const GetOrganizationPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizationPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PermissionsFiltersInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sorting"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalTeamMembers"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"accessLevel"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationPermissionsQuery, GetOrganizationPermissionsQueryVariables>;
export const IsWebsiteConnectedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsWebsiteConnected"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isWebsiteConnected"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"websiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}]}]}}]} as unknown as DocumentNode<IsWebsiteConnectedQuery, IsWebsiteConnectedQueryVariables>;
export const IsHubspotConnectedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsHubspotConnected"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isHubspotConnected"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"websiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}]}]}}]} as unknown as DocumentNode<IsHubspotConnectedQuery, IsHubspotConnectedQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"websiteId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}},{"kind":"Field","name":{"kind":"Name","value":"notificationType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const SelectorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Selectors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"websiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"querySelector"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"websiteId"}}]}}]}}]} as unknown as DocumentNode<SelectorsQuery, SelectorsQueryVariables>;
export const GetWebsiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWebsite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"website"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"snippetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"snippetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"scriptUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"pixelScriptGenerationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"defaultDashboardId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hubspotIntegrationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"salesforceIntegrationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"metaAdsIntegrationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"googleAdsIntegrationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetWebsiteQuery, GetWebsiteQueryVariables>;
export const WebsiteUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"WebsiteUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"websiteUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"websiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"snippetUrl"}},{"kind":"Field","name":{"kind":"Name","value":"scriptUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"pixelScriptGenerationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<WebsiteUpdatedSubscription, WebsiteUpdatedSubscriptionVariables>;