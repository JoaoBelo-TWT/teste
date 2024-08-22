/* eslint-disable max-len */
import { gql } from '@/__generated__';

export const sendShareALinkEmailMutation = gql(`
  mutation SendShareALinkSetupEmail($sendShareALinkSetupEmailInput: SendShareALinkSetupEmailInput!) {
    sendShareALinkSetupEmail(sendShareALinkSetupEmailInput: $sendShareALinkSetupEmailInput)
  }
`);
