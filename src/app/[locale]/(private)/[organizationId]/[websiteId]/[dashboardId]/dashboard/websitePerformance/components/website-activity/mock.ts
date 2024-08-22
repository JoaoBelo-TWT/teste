/* eslint-disable i18next/no-literal-string */
export const mockTableData = [
  {
    page: {
      text: 'Home',
      imageSrc: '/logo.webp'
    },
    views: 865,
    conversions: 236
  },
  {
    page: {
      text: 'Pricing',
      imageSrc: '/logo.webp'
    },
    views: 625,
    conversions: 478
  },
  {
    page: {
      text: 'Product',
      imageSrc: '/logo.webp'
    },
    views: 423,
    conversions: 236
  },
  {
    page: {
      text: 'Newsletter',
      imageSrc: '/logo.webp'
    },
    views: 296,
    conversions: 79
  },
  {
    page: {
      text: 'Contact',
      imageSrc: '/logo.webp'
    },
    views: 229,
    conversions: 178
  }
];

export const mockTopSources = ['/logo.webp', '/logo.webp', '/logo.webp', '/logo.webp'];

export const mockChartData = [
  {
    traffic: 193,
    date: '15:00',
    hideDot: true
  },
  {
    traffic: 332,
    date: '16:00',
    hideDot: true
  },
  {
    traffic: 267,
    date: '17:00',
    hideDot: true
  },
  {
    traffic: 170,
    date: '18:00',
    hideDot: true
  },
  {
    traffic: 281,
    date: '19:00',
    hideDot: true
  },
  {
    traffic: 281,
    date: '20:00',
    hideDot: true
  },
  {
    traffic: 295,
    date: '21:00',
    hideDot: true
  },
  {
    traffic: 401,
    date: '22:00',
    hideDot: true
  },
  {
    traffic: 174,
    date: '23:00',
    hideDot: true
  },
  {
    traffic: 206,
    date: '00:00',
    hideDot: true
  },
  {
    traffic: 127,
    date: '01:00',
    hideDot: true
  },
  {
    traffic: 95,
    date: '02:00',
    hideDot: true
  },
  {
    traffic: 77,
    date: '03:00',
    hideDot: true
  },
  {
    traffic: 149,
    date: '04:00',
    hideDot: true
  },
  {
    traffic: 119,
    date: '05:00',
    hideDot: true
  },
  {
    traffic: 128,
    date: '06:00',
    hideDot: true
  },
  {
    traffic: 192,
    date: '07:00',
    hideDot: true
  },
  {
    traffic: 184,
    date: '08:00',
    hideDot: true
  },
  {
    traffic: 294,
    date: '09:00',
    hideDot: true
  },
  {
    traffic: 260,
    date: '10:00',
    hideDot: true
  },
  {
    traffic: 240,
    date: '11:00',
    hideDot: true
  },
  {
    traffic: 378,
    date: '12:00',
    hideDot: true
  },
  {
    traffic: 230,
    date: '13:00',
    hideDot: true
  },
  {
    traffic: 194,
    date: '14:00',
    hideDot: true
  },
  {
    traffic: 53,
    date: '15:00',
    hideDot: false
  }
];

export const mockDashboardData = {
  __typename: 'DashboardWebsiteActivity',
  domain: 'source.com',
  websiteImageUrl: '/logo.webp',
  conversionRate: 0.6321428571428571,
  totalSources: 155,
  pageViews: [
    {
      __typename: 'DashboardWebsiteActivityPageViews',
      page: 'Collections/Earrings',
      views: 865,
      conversions: 236
    },
    {
      __typename: 'DashboardWebsiteActivityPageViews',
      page: 'Homepage',
      views: 625,
      conversions: 478
    },
    {
      __typename: 'DashboardWebsiteActivityPageViews',
      page: 'Collections/Best-Sellers',
      views: 423,
      conversions: 236
    },
    {
      __typename: 'DashboardWebsiteActivityPageViews',
      page: 'Collections/Necklaces',
      views: 296,
      conversions: 79
    },
    {
      __typename: 'DashboardWebsiteActivityPageViews',
      page: 'Products/Mama-Bracelet',
      views: 229,
      conversions: 178
    }
  ],
  sources: [
    {
      __typename: 'DashboardWebsiteActivitySources',
      name: 'google',
      imageUrl: '/logo.webp',
      conversions: 47648
    },
    {
      __typename: 'DashboardWebsiteActivitySources',
      name: 'instagram',
      imageUrl: '/logo.webp',
      conversions: 42023
    },
    {
      __typename: 'DashboardWebsiteActivitySources',
      name: 'facebook',
      imageUrl: 'https://source-images-s3.s3.amazonaws.com/logos/facebook.svg',
      conversions: 20809
    },
    {
      __typename: 'DashboardWebsiteActivitySources',
      name: 'shareasale-analytics',
      imageUrl: 'https://source-images-s3.s3.amazonaws.com/logos/shareasale-analytics.webp',
      conversions: 13260
    },
    {
      __typename: 'DashboardWebsiteActivitySources',
      name: 'youtube',
      imageUrl: 'https://source-images-s3.s3.amazonaws.com/logos/youtube.svg',
      conversions: 7882
    }
  ],
  traffic: [
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 193,
      date: '2024-04-03T14:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 332,
      date: '2024-04-03T15:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 267,
      date: '2024-04-03T16:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 170,
      date: '2024-04-03T17:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 281,
      date: '2024-04-03T18:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 281,
      date: '2024-04-03T19:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 295,
      date: '2024-04-03T20:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 401,
      date: '2024-04-03T21:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 174,
      date: '2024-04-03T22:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 206,
      date: '2024-04-03T23:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 127,
      date: '2024-04-04T00:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 95,
      date: '2024-04-04T01:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 77,
      date: '2024-04-04T02:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 149,
      date: '2024-04-04T03:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 119,
      date: '2024-04-04T04:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 128,
      date: '2024-04-04T05:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 192,
      date: '2024-04-04T06:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 184,
      date: '2024-04-04T07:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 294,
      date: '2024-04-04T08:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 260,
      date: '2024-04-04T09:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 240,
      date: '2024-04-04T10:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 378,
      date: '2024-04-04T11:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 230,
      date: '2024-04-04T12:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 194,
      date: '2024-04-04T13:00:00.000Z'
    },
    {
      __typename: 'DashboardWebsiteActivityTraffic',
      pageViews: 53,
      date: '2024-04-04T14:00:00.000Z'
    }
  ]
};
/* eslint-enable i18next/no-literal-string */
