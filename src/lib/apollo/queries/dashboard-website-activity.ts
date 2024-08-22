import { gql } from '@/__generated__';

export const getDashboardWebsiteActivityQuery = gql(`
  query GetDashboardWebsiteActivity(
    $dashboardId: UUID!
    $dashboardTimeframe: DashboardTimeframe!
    $pageViewsSorting: PageViewsSorting!
    $take: Int
  ) {
    dashboardWebsiteActivity(
      dashboardId: $dashboardId
      dashboardTimeframe: $dashboardTimeframe
      pageViewsSorting: $pageViewsSorting
      take: $take
    ) {
      domain
      websiteImageUrl
      conversionRate
      totalSources
      hasEvents
      pageViews {
        page
        views
        conversions
      }
      sources {
        name
        imageUrl
        conversions
      }
      traffic {
        pageViews
        date
      }
    }
  }
`);
