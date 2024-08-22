import { Plus } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export function AppendButton({ onClick }: Readonly<{ onClick: () => void }>) {
  const t = useTranslations('onboarding.stages.form');

  return (
    <Button leftSection={<Plus size={16} />} variant="outline" size="medium" onClick={onClick}>
      {t('addAnotherEventButton')}
    </Button>
  );
}
