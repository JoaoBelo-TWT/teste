import { gql } from '@/__generated__';

export const getWebsiteNotificationsQuery = gql(`
  query GetNotifications(
		$websiteId: String!
		$take: Int
		$skip: Int
    $first: Int
    $after: String
    $last: Int
    $before: String
	) {
  notifications(
		filters: {
      websiteId: {
        eq: $websiteId
      }
    }
    take: $take
    skip: $skip
    first: $first
    after: $after
    last: $last
    before: $before
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
