/* eslint-disable max-len */
import { gql } from '@/__generated__';

export const sendConnectionsRecommendationEmailMutation = gql(`
  mutation SendConnectionsRecommendationEmail($sendConnectionsRecommendationEmailInput: SendConnectionsRecommendationEmailInput!) {
    sendConnectionsRecommendationEmail(sendConnectionsRecommendationEmailInput: $sendConnectionsRecommendationEmailInput)
  }
`);
