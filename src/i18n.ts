import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const DEFAULT_LOCALE = 'en';
const DE = 'de';
export const locales = [DEFAULT_LOCALE, DE];

export type LocaleType = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages:
      (
        await (locale === DEFAULT_LOCALE
          ? // When using Turbopack, this will enable HMR for `en`
            import(`./locales/${DEFAULT_LOCALE}.json`)
          : import(`./locales/${locale}.json`))
      // prettier-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ).default
  };
});
