'use server';

import { getTranslations } from 'next-intl/server';

export async function ConnectGoogleAdds() {
  const t = await getTranslations('onboarding.setup.step3');
  try {
    // TODO: Integrate Connect google adds request
    return {
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}
