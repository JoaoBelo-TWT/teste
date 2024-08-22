import { gql } from '@/__generated__';

export const getWebsiteNotificationsQuery = gql(`
  query GetNotifications(
		$websiteId: String!
		$take: Int
	) {
  notifications(
		filters: {
      websiteId: {
        eq: $websiteId
      }
    }
    first: $take
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        websiteId
        notificationType
        title
        message
        createdAt
        updatedAt
      }
    }
  }
}
`);
