import countries from './countries';
import type { CircleFlagProps, CountryCode } from './types';

const CDN_URL = 'https://d11h29rvzk0dwa.cloudfront.net/flags/';
const FILE_SUFFIX = 'svg';
const UNKNOWN_FLAG = 'un';

const parseCountryCode = (countryCode: CountryCode) => (countries[countryCode] ? countryCode : UNKNOWN_FLAG);

export function CircleFlag({ countryCode, height = 32, width = 32, alt }: Readonly<CircleFlagProps>) {
  return (
    <img src={`${CDN_URL}${parseCountryCode(countryCode)}.${FILE_SUFFIX}`} width={width} height={height} alt={alt} />
  );
}
