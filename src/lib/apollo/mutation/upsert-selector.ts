import { gql } from '@/__generated__';

export const upsertSelectorsMutation = gql(`
mutation UpsertSelector($upsertSelectorSelectors: [UpsertSelectorInput!]!) {
  upsertSelector(selectors: $upsertSelectorSelectors) {
    link
    querySelector
    websiteId
  }
}
`);
