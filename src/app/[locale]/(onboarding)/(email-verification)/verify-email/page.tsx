import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { TextContent } from '@/components/ui/text-content';
import { routes } from '@/routes/routes';

import { ResendEmailButton } from './components/resend-email-button';

export default async function VerifyEmailPage() {
  const t = await getTranslations();
  const session = await getSession();

  if (session?.user?.email_verified) {
    redirect(routes.homePage.path);
  }

  return (
    <>
      <TextContent title={t('general.verifyEmail.title')} description={t('general.verifyEmail.description')} />
      <ResendEmailButton />
    </>
  );
}
