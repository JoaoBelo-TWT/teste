import { gql } from '@/__generated__';

export const createCustomerFunnelStagesMutation = gql(`
mutation CreateCustomerFunnelStage($createCustomerFunnelStageInput: [CreateCustomerFunnelStageInput!]!) {
  createCustomerFunnelStage(createCustomerFunnelStageInput: $createCustomerFunnelStageInput) {
    dashboardId
    id
  }
}
`);
