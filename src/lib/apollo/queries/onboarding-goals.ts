import { gql } from '@/__generated__';

export const getOnboardingGoalsQuery = gql(`
  query GetOnboardingGoals($dashboardId: String!) {
    activityGoals(filters: { dashboardId: { eq: $dashboardId }} first: 1) 
    {
        edges {
            node {
                id
                numberOfEvents
                customerFunnelStageId
	        }
        }
    }
	budgetGoals(filters: { dashboardId: { eq: $dashboardId}}, first: 1) {
		edges {
			node {
          id
			    currency
          recurring
          value
          recurringRepeat
		    }
	    }
	}
  }
`);
