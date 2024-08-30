import dayjs, { Dayjs } from 'dayjs';

import { DashboardTimeframe } from '@/__generated__/graphql';

import { ChartDataItem } from './types';

// Type for a date range object
interface DateRange {
  start: Dayjs;
  end: Dayjs;
  increment: number;
  unit: 'day' | 'month';
}

// Function to generate a range of dates
export const getDateRange = (start: Dayjs, end: Dayjs, increment: number, unit: 'day' | 'month'): Date[] => {
  const dates: Date[] = [];
  for (
    let currentDate = start;
    currentDate.isBefore(end) || currentDate.isSame(end, unit);
    currentDate = currentDate.add(increment, unit)
  ) {
    dates.push(currentDate.toDate());
  }
  return dates;
};
/* eslint-disable i18next/no-literal-string */
// Function to fill data for the specified period
export const fillDataForPeriod = (
  dates: Date[],
  data: ChartDataItem[],
  getChartDateFormat: (date: Date) => string,
  timeframe: DashboardTimeframe
): ChartDataItem[] => {
  // Check if data has more than 1 item
  if (data.length <= 1 || timeframe === DashboardTimeframe.LastDay) {
    return data;
  }

  return dates.map((date) => {
    const existingData = data.find((item) => dayjs(item.originalDate).isSame(date, 'day'));
    return (
      existingData || {
        value: undefined,
        date: getChartDateFormat(date),
        originalDate: date,
        hideDot: true,
        previousValue: undefined
      }
    );
  });
};

// Function to get the date period based on the timeframe
export const getDatePeriod = (timeframe: DashboardTimeframe): DateRange => {
  const now = dayjs();
  switch (timeframe) {
    case DashboardTimeframe.ThisWeek:
      return {
        start: now.startOf('week').add(1, 'day'), // Monday
        end: now.endOf('week'), // Sunday
        increment: 1,
        unit: 'day'
      };
    case DashboardTimeframe.ThisMonth:
      return {
        start: now.startOf('month'),
        end: now.endOf('month'),
        increment: 1,
        unit: 'day'
      };
    case DashboardTimeframe.ThisYear:
      return {
        start: now.startOf('year'),
        end: now.endOf('year'),
        increment: 1,
        unit: 'month'
      };
    default:
      return { start: now, end: now, increment: 1, unit: 'day' };
  }
};

// function to add placeholder days to the graph
// If api returns day 10 and 15, this function will fill the gap days 11 to 14 with the same data as day 10

export function fillDataGaps(
  data: ChartDataItem[],
  getChartDateFormat: (date: Date | string) => string,
  timeframe: DashboardTimeframe
): ChartDataItem[] {
  if (data.length < 2) return data;

  const result: ChartDataItem[] = [];
  const existingDates = new Set(data.map((item) => item.originalDate));

  for (let i = 0; i < data.length - 1; i += 1) {
    result.push(data[i]);

    const currentDate = dayjs(data[i].originalDate);
    const nextDate = dayjs(data[i + 1].originalDate);

    // Determine the increment based on the timeframe
    let fillerDate =
      timeframe !== DashboardTimeframe.ThisYear
        ? currentDate.add(1, 'day')
        : currentDate.startOf('month').add(1, 'month');

    while (fillerDate.isBefore(nextDate, 'day')) {
      const formattedDate = getChartDateFormat(fillerDate.toDate());
      const fillerDateISO = fillerDate.toISOString();

      // Avoid adding duplicate entries
      if (!existingDates.has(fillerDateISO)) {
        const fillerItem: ChartDataItem = {
          ...data[i],
          date: formattedDate,
          originalDate: fillerDateISO,
          value: data[i].value,
          previousValue: data[i].value
        };
        result.push(fillerItem);
        existingDates.add(fillerDateISO); // Update the Set with the new date
      }

      // Move to the next date based on timeframe
      fillerDate = timeframe !== DashboardTimeframe.ThisYear ? fillerDate.add(1, 'day') : fillerDate.add(1, 'month');
    }
  }

  return result;
}
export function fillPreviousValues(data: ChartDataItem[]): ChartDataItem[] {
  // Find the first object with a value
  const foundValueIndex = data.findIndex((item) => item.value !== undefined);

  // If no value is found, return the data as is
  if (foundValueIndex === -1) {
    return data;
  }

  // Get the value from the first object with a value
  const firstValue = data[foundValueIndex].value!;

  const updatedData = data.map((item, index) => {
    if (index < foundValueIndex) {
      return {
        ...item,
        value: 0,
        previousValue: firstValue
      };
    }
    if (index === foundValueIndex) {
      return {
        ...item,
        previousValue: firstValue
      };
    }
    return item;
  });

  return updatedData;
}
