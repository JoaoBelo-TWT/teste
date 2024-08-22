import { gql } from '@/__generated__';

export const upsertFunnelStagesMutation = gql(`
mutation UpsertCustomerFunnelStage($upsertCustomerFunnelStageInput: [UpsertCustomerFunnelStageInput!]!) {
  upsertCustomerFunnelStage(upsertCustomerFunnelStageInput: $upsertCustomerFunnelStageInput) {
      id
      name
      dashboardId
  }
}
`);
