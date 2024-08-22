import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getTranslations } from 'next-intl/server';

dayjs.extend(relativeTime);
dayjs.extend(isYesterday);

export async function formatPastDate(date: Date | string) {
  const t = await getTranslations();
  const now = dayjs();
  const targetDate = dayjs(date);
  /* eslint-disable i18next/no-literal-string */
  const minutesDiff = now.diff(targetDate, 'minute');
  const hoursDiff = now.diff(targetDate, 'hour');

  if (minutesDiff < 15) {
    return t('common.justNow');
  }

  if (minutesDiff < 60) {
    return `${minutesDiff} ${t('common.minutesAgo')}`;
  }

  if (hoursDiff < 24) {
    return `${hoursDiff} ${t('common.hoursAgo')}`;
  }

  return targetDate.format('DD/MM');
}
