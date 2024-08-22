/* eslint-disable i18next/no-literal-string */

import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';

import { ContentContainer } from '@/components/layouts/content-container';
import { Card } from '@/components/ui/card';
import { TextContent } from '@/components/ui/text-content';
import { fetchDashboardsData } from '@/lib/fetch-dashboards-data';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

import { PreBoardingModal } from './components/pre-boarding-modal';
import classes from './index.module.css';

export default async function NewDashboard({
  params
}: Readonly<{ params: { organizationId: string; websiteId: string } }>) {
  const t = await getTranslations();
  const { organizationId, websiteId } = params;

  // Parallelizing the data fetching
  const dashboardsData = await fetchDashboardsData(websiteId);
  const dashboardCount = dashboardsData?.dashboards?.edges.length || 0;

  const cardsData = [
    {
      color: 'var(--flat-orange-100-color)',
      imageAlt: 'Hot ballon',
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/hot_air_balloon.webp`,
      widgets: t('dashboard.new.widgets', { number: 4 }),
      title: t('dashboard.new.cards.executive.title'),
      description: t('dashboard.new.cards.executive.description'),
      href: {
        pathname: routes.dashboard.dashboardCreate.create.path(organizationId, websiteId),
        query: { flow: OnboardingFlowType.EXECUTIVE }
      },
      tooltip: t('dashboard.new.cards.executive.tooltip')
    },
    {
      color: 'var(--flat-pink-100-color)',
      imageAlt: 'Pig',
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/pig.webp`,
      widgets: t('common.comingSoon'),
      title: t('dashboard.new.cards.paid.title'),
      description: t('dashboard.new.cards.paid.description')
      // href: { pathname: routes.dashboard.onboarding.create.path, query: { flow: OnboardingFlowType.PAID } }
    },
    {
      color: 'var(--flat-green-100-color)',
      imageAlt: 'Flag',
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/flag.webp`,
      widgets: t('common.comingSoon'),
      title: t('dashboard.new.cards.campaign.title'),
      description: t('dashboard.new.cards.campaign.description')
      // href: { pathname: routes.dashboard.onboarding.create.path, query: { flow: OnboardingFlowType.CAMPAIGN } }
    },
    {
      color: 'var(--flat-blue-100-color)',
      imageAlt: 'Chat',
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/chat.webp`,
      widgets: t('common.comingSoon'),
      title: t('dashboard.new.cards.organic.title'),
      description: t('dashboard.new.cards.organic.description')
      // href: { pathname: routes.dashboard.onboarding.create.path, query: { flow: OnboardingFlowType.CHAT } }
    }
  ];

  return (
    <ContentContainer>
      <TextContent
        descriptionProps={{ ta: 'center' }}
        titleProps={{ ta: 'center' }}
        title={t('title')}
        description={t('dashboard.new.text')}
      />
      <div className={classes['new-dashboard__cards']}>
        {cardsData.map((item) => (
          <div
            key={crypto.randomUUID()}
            className={clsx((!item.href || dashboardCount > 0) && classes['new-dashboard__cards--disabled'])}
          >
            <Card
              tooltip={dashboardCount > 0 ? item.tooltip : undefined}
              href={dashboardCount > 0 ? undefined : item.href}
              key={crypto.randomUUID()}
              imageBgColor={item.color}
              imageAtl={item.imageAlt}
              imageSrc={item.imageSrc}
              widgets={item.widgets}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
      <PreBoardingModal />
    </ContentContainer>
  );
}
