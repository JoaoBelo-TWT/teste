import { gql } from '@/__generated__';

export const setCurrentOnboardingPathMutation = gql(`
  mutation SetCurrentOnboardingPath($currentOnboardingPath: String) {
    setCurrentOnboardingPath(
      currentOnboardingPath: $currentOnboardingPath
    ) {
      id
      currentOnboardingPath
      createdAt
      updatedAt
    }
  }
`);
