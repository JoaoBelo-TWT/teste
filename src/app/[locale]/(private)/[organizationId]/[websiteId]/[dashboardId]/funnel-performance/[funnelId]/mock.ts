import { FunnelPerformanceRowData } from './components/funnel-details-table/types';

/* eslint-disable i18next/no-literal-string */
export const mockData = [
  {
    id: '1',
    sourceUrl: 'instagram/reminder/live_session_coming_soon/your_',
    firstPageVisited: 'metalab.com/home',
    conversions: 3
  },
  {
    id: '2',
    sourceUrl: 'google/reminder/calendar_event_coming_soon/google/reminder/calendar_event_coming_soon/',
    firstPageVisited: 'metalab.com/careers',
    conversions: 12
  },
  {
    id: '3',
    sourceUrl: 'reddit/reminder/ongoing_discussion',
    firstPageVisited: 'metalab.com/home',
    conversions: 0
  },
  {
    id: '4',
    sourceUrl: 'mailchimp/reminder/bookings_open_soon',
    firstPageVisited: 'metalab.com/case_study_uber',
    conversions: 2
  },
  {
    id: '5',
    sourceUrl: 'instagram/reminder/live_session_coming_soon/your_',
    firstPageVisited: 'metalab.com/home',
    conversions: 3
  }
] as FunnelPerformanceRowData[];
