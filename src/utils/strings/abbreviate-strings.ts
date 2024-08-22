import { getStringAcronym } from './get-string-acronym';

export type GetAcronymOrAbbreviateStringParams = {
  value?: string | null;
  lettersThresholdForAbbreviation?: number;
};

export function getAcronymOrAbbreviateString({
  value,
  lettersThresholdForAbbreviation = 5
}: GetAcronymOrAbbreviateStringParams): string {
  if (!value) {
    return '';
  }

  if (value.includes(' ')) {
    return getStringAcronym({ value });
  }

  if (lettersThresholdForAbbreviation && value.toString().length <= lettersThresholdForAbbreviation) {
    return value.toString();
  }

  return `${value.substring(0, lettersThresholdForAbbreviation)}...`;
}
