export const WAIT_TIME_DELAY = 500;
export const LOCAL_STORAGE_ONBOARD_MODAL = 'showOnboardModal';
export const CONNECT_WEBSITE_DEFAULT = 'selfHosted';
export const MAX_WIDTH = 1440;
export const MAX_IMAGE_SIZE_MB = 1.98;
export const LEARN_MORE_ABOUT_PARAMS_URL = 'https://www.source.app/user-guide/sourcepixel-queryselectors-setup-guide';

export const STAT_VARIANT = {
  DEFAULT: 'default',
  LARGE: 'large',
  AVATAR: 'avatar'
};

export const DATE_FORMATS = {
  FULL: 'MMM D, YYYY',
  HOUR: 'h:mm A',
  COMPACT: 'MMM D',
  COMPACT_WEEKDAY: 'ddd MMM D'
};

export const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1408
};

export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 96
};

export const RADIUS = {
  xs: 4,
  sm: 6,
  md: 12,
  lg: 24,
  xl: 64,
  xxl: 100
};

export const BUTTON_VARIANT = {
  FILLED: 'filled',
  OUTLINE: 'outline',
  DANGER: 'danger'
};

export const DATA_TEST_IDS = {
  ORGANIZATION_DROPDOWN: 'organization-dropdown',
  WEBSITES_DROPDOWN: 'websites-dropdown',
  MAIN_DASHBOARD: 'main-dashboard'
};

export const MODALS = {
  LOGOUT: 'logout',
  INVITE_MEMBERS: 'inviteMembers',
  ADD_EXPENSE: 'addExpense',
  REMOVE_TEAM_MEMBER: 'removeTeamMember',
  CHANGE_USER_PERMISSIONS: 'changeUserPermissions',
  CREATE_CLOSE_DASHBOARD: 'createCloseDashboard',
  CREATE_WEBSITE_CLOSE: 'createWebsiteClose',
  DELETE_DASHBOARD: 'deleteDashboard',
  EDIT_FUNNEL: 'editFunnel',
  DELETE_FUNNEL: 'deleteFunnel',
  // budget modals
  DELETE_BUDGET_GOAL: 'deleteBudgetGoal',
  CREATE_BUDGET_GOAL: 'createBudgetGoal',
  EDIT_BUDGET_GOAL: 'editBudgetGoal',
  // activity modals
  DELETE_ACTIVITY_GOAL: 'deleteActivityGoal',
  CREATE_ACTIVITY_GOAL: 'createActivityGoal',
  EDIT_ACTIVITY_GOAL: 'editActivityGoal',
  SHARE_A_LINK: 'shareALink',
  UPSERT_QUERY_SELECTORS: 'upsertQuerySelectors',
  CONNECT_CONFIRMATION: 'connectConfirmation'
};

export const COLORS = {
  brandNavy: '#2b2039',
  colorPurple600: '#8489fe',
  colorPurpleSoft: '#e6e7ff',
  colorDarkBlueSoft: '#4289b1',
  colorBrownSoft: '#b8944e',
  colorOrangeSoft: '#ffdf6c',
  colorYellowSoft: '#ffdc5e',
  colorPinkFlamingo: '#ff57d9',
  colorElectricViolet: '#8d34ff',
  colorPacificBlue: '#00a5bc',
  colorEggBlue: '#00dec3',
  colorLightAqua: '#b6ffe7',
  colorGreenSoft: '#52ef81',
  colorPinkSoft: '#FFD5F1',
  colorPurpleThunder: '#D478FF',
  colorPaleBlue: '#a6eeed',
  colorMayaBlue: '#71ccff',
  flatGreen: '#aedece',
  flatPink: '#f19de9',
  flatBlue: '#9ac9eb',
  flatOrange: '#f9c99c',
  flatOrange100: '#ffd493',
  flatOrange600: '#ff9901',
  flatGreen100: '#95f0a9',
  flatPink100: '#fdc4f0',
  flatPink600: '#ff80e3',
  flatBlue100: '#9aeffa',
  systemGreen500: '#12d031',
  systemGreen600: '#01bc41',
  systemBlue600: '#00a5bc',
  systemRed: '#f22121',
  gray: '#F1F1F1',
  lightGray: '#E7E7E7'
};

export const CONNECTIONS = {
  HUBSPOT: `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/hubspot/auth`,
  SALESFORCE: `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/salesforce/auth`,
  META_ADDS: `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/meta-ads/auth`,
  GOOGLE_ADS: `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/google-ads/auth`
};

export const GOOGLE_ADS_LINKS = {
  SECURITY_PATH: 'https://ads.google.com/nav/selectaccount?authuser=0&dst=/aw/accountaccess/settings',
  USERS_PATH: 'https://ads.google.com/nav/selectaccount?authuser=0&dst=/aw/accountaccess/users',
  EMAIL: 'integrations@source.app'
};

export const CRM = {
  HUBSPOT: 'https://app.hubspot.com',
  SALESFORCE: 'https://www.salesforce.com/'
};

export const ADS = {
  META: 'https://www.facebook.com/business/ads',
  GOOGLE: 'https://ads.google.com/'
};

/* Any changes here should be also applied in the backend */
export const CUSTOM_ERROR_CODES = {
  permissions: {
    USER_BELONGS_TO_ORGANIZATION: 'userBelongsToOrganization'
  }
};
