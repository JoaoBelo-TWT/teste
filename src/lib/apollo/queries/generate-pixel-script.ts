import { gql } from '@/__generated__';

export const generatePixelScriptQuery = gql(`
  query GeneratePixelScript(
    $websiteId: UUID!
  ) {
    generatePixelScript(
      id: $websiteId
    )
  }
`);
