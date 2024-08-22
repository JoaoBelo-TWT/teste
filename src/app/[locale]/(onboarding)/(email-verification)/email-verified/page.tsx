import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { TextContent } from '@/components/ui/text-content';
import { routes } from '@/routes/routes';

export default async function EmailVerifiedPage() {
  const t = await getTranslations();

  return (
    <>
      <TextContent title={t('general.emailVerified.title')} description={t('general.emailVerified.title')} />
      <Link href={routes.homePage.path}>
        <Button variant="filled">{t('common.continue')}</Button>
      </Link>
    </>
  );
}
