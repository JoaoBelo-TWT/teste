import { gql } from '@/__generated__';

export const getStageQuery = gql(`
  query GetStage(
    $id: UUID!
    ) {
    customerFunnelStage(id: $id) {
		id
		dashboardId
		customerFunnelStageEvents {
			id
			customerFunnelStageId
			name
			eventType
			customerFunnelStageEventConditions {
				id
				customerFunnelStageEventId
				pageUrl
				visitorType
				startingUrl
				startingUrlCondition
				destinationUrl
				destinationUrlCondition
			}
		}
		name
		createdAt
		updatedAt
	}
  }
`);
