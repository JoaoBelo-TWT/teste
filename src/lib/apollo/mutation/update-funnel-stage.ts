import { gql } from '@/__generated__';

export const updateFunnelStageMutation = gql(`
mutation UpdateFunnelStage($updateCustomerFunnelStageInput: UpdateCustomerFunnelStageInput!) {
	updateCustomerFunnelStage(updateCustomerFunnelStageInput: $updateCustomerFunnelStageInput) {
		dashboardId,
		id
		name
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
		createdAt
		updatedAt
	}
}
`);
