import countries from './countries';

export type CountryCode = keyof typeof countries;

export type CircleFlagProps = {
  width?: number;
  height?: number;
  alt: string;
  countryCode: CountryCode;
};
