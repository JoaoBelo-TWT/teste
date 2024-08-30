import { Table, TableCaption, TableThead, TableTh, TableTd, TableTr, TableTbody, Text } from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useFormatter, useTranslations } from 'next-intl';

import { Avatar } from '@/components/ui/avatar';
import { BaseCard } from '@/components/ui/base-card';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/formatters/numbers';

import classes from './index.module.css';
import { PagesSorting } from './pages-sorting';
import { TableCardProps } from './types';

export function TableCard({ headers, data, websiteUrl }: Readonly<TableCardProps>) {
  const t = useTranslations('dashboard.overview.activityCard.topPagesCard');
  const format = useFormatter();
  const tHeaders = headers.map((value) => <TableTh key={value}>{value}</TableTh>);

  const rows = data.map((element) => (
    <TableTr key={element.page.text} className={classes['table-card__tr']}>
      <TableTd w={'60%'}>
        <div className={classes['table-card__td']}>
          <Avatar
            name={
              element.page.imageSrc === process.env.NEXT_PUBLIC_DEFAULT_IMG_URL && websiteUrl
                ? websiteUrl.charAt(0)
                : undefined
            }
            src={element.page.imageSrc === process.env.NEXT_PUBLIC_DEFAULT_IMG_URL ? null : element.page.imageSrc}
            alt={element.page.text}
          />
          {element.page.text}
        </div>
      </TableTd>
      <TableTd>
        {formatNumber({
          value: element.views,
          nextIntlFormatter: format,
          options: { notation: 'compact' }
        })}
      </TableTd>
      <TableTd>
        {formatNumber({
          value: element.conversions,
          nextIntlFormatter: format,
          options: { notation: 'compact' }
        })}
      </TableTd>
    </TableTr>
  ));

  return (
    <BaseCard paperProps={{ classNames: { root: classes['table-card__root'] } }}>
      <div className={classes['table-card__header']}>
        <Text c="var(--brand-navy-color)" fz="stat3" lh="body2" fw={400}>
          {t('title')}
        </Text>
        {/* <IconButton variant="light" size={36} radius="100px">
          <DotsThreeVertical size={12} />
        </IconButton> */}
      </div>
      <div className={classes['table-card__controls']}>
        <PagesSorting />
      </div>
      <div className={classes['table-card__table-container']}>
        <Table classNames={{ th: classes['table-card__th'] }} verticalSpacing={12}>
          <TableThead>
            <TableTr className={classes['table-card__table-header-row']}>{tHeaders}</TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
          <TableCaption className={classes['table-card__table-caption']} h={48}>
            <Button px={24} disabled variant="transparent" size="small" rightSection={<ArrowRight size={16} />}>
              {t('viewAllPages')}
            </Button>
          </TableCaption>
        </Table>
      </div>
    </BaseCard>
  );
}
