'use client';

import { useCombobox, Tooltip, Box } from '@mantine/core';
import { ChartBar, Pencil } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useSetQueryParamClient } from '@/hooks/query-params/set-query-params-client';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

import classes from './index.module.css';

export function HeaderButtons() {
  const t = useTranslations();
  const comboboxFirstTouch = useCombobox();
  const searchParams = useSearchParams();
  const { setQueryParam } = useSetQueryParamClient();
  const { organizationId, dashboardId, websiteId } = useParams<{
    organizationId: string;
    dashboardId: string;
    websiteId: string;
  }>();

  const attributionModel =
    searchParams.get(DashboardQueryParams.attributionModel.key) ?? DashboardQueryParams.attributionModel.default;

  const options = [
    {
      value: t('dashboard.overview.customerJourneyCard.filters.attributionModel.dropdownOptions.firstTouch'),
      label: t('dashboard.overview.customerJourneyCard.filters.attributionModel.dropdownOptions.firstTouch')
    }
  ]; // TODO: filter is static for now as there is only one option

  const comingSoon = true;

  return (
    <div className={classes['header-buttons__container']}>
      <Link
        href={{
          pathname: routes.website.dashboards.path(organizationId, websiteId),
          query: { dashboardId },
          hash: `goals-${dashboardId}`
        }}
        scroll={false}
      >
        <Button variant="light" size="medium" leftSection={<Pencil size={16} />}>
          {t('common.edit')}
        </Button>
      </Link>

      <Tooltip.Floating multiline p={SPACING.xs} label={t('common.comingSoon')}>
        <Box>
          <Dropdown
            disabled={comingSoon}
            store={comboboxFirstTouch}
            data={options}
            headerLabel={t('dashboard.overview.customerJourneyCard.filters.attributionModel.dropdownHeader')}
            onOptionSubmit={(value) => {
              setQueryParam({
                name: DashboardQueryParams.attributionModel.key,
                value
              });
              comboboxFirstTouch.closeDropdown();
            }}
          >
            <Button
              disabled={comingSoon}
              variant="light"
              size="medium"
              leftSection={<ChartBar size={16} />}
              onClick={() => comboboxFirstTouch.toggleDropdown()}
            >
              {options.find((o) => o.value === attributionModel)?.label ?? options.find((o) => o)?.label}
            </Button>
          </Dropdown>
        </Box>
      </Tooltip.Floating>
    </div>
  );
}
