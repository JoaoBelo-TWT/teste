import { ColorSchemeScript } from '@mantine/core';
import { GoogleTagManager } from '@next/third-parties/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import { Providers } from '@/app/providers';
import { locales } from '@/i18n';

import '@/assets/styles/globals.css';

export const dynamic = 'force-dynamic';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale });

  return {
    title: t('title')
  };
}

export default function LocaleLayout({ children, params: { locale } }: Readonly<Props>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER as string} />
    </html>
  );
}
