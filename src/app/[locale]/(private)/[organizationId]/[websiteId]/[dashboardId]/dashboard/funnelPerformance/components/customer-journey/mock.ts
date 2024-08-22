import { FunnelChartProps } from '@/components/charts/funnel-chart/types';

/* eslint-disable i18next/no-literal-string */
export const mockCustomerJourneys: FunnelChartProps[] = [
  {
    id: '1',
    title: 'Leads',
    trackedEventDescription: 'Leads',
    figureValue: '2.75K',
    figureLabel: 'Conversion Events',
    percentage: 1,
    percentageChange: 100,
    isPercentageVisible: false,
    rootStyles: {
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0'
    },
    gradientStyles: {
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '0'
    }
  },
  {
    id: '2',
    title: 'Marketing Qualified Leads',
    trackedEventDescription: 'User Adds something to cart',
    figureValue: '970',
    figureLabel: 'Conversion Events',
    percentage: 0.3529,
    percentageChange: 100,
    isPercentageVisible: true,
    rootStyles: {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0'
    },
    gradientStyles: {
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0'
    }
  }
];
/* eslint-enable i18next/no-literal-string */
