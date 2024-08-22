import { createTheme, rem } from '@mantine/core';

import { RADIUS, SPACING } from '@/resources/constants';

export const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Universal Sans, sans-serif',
  shadows: {
    xs: '0px 8px 12px 0px #08006405'
  },
  colors: {
    dark: [
      '#FFFFFF',
      '#F7F7F7',
      '#F0F0F0',
      '#E7E7E7',
      '#DBDBDB',
      '#B1B1B1',
      '#898989',
      '#616161',
      '#353535',
      '#111111'
    ],
    blue: [
      '#E9EEFF',
      '#CFD7FF',
      '#9CACFF',
      '#657EFE',
      '#3957FD',
      '#1E3EFD',
      '#0F32FE',
      '#0026E3',
      '#0021CB',
      '#001BB3'
    ],
    purple: [
      '#fdeeff',
      '#f1dbf5',
      '#dfb6e5',
      '#cb8ed6',
      '#bb6cc8',
      '#b157c0',
      '#ad4bbd',
      '#973ca7',
      '#873496',
      '#762984'
    ]
  },
  breakpoints: {
    m: '52em'
  },
  cursorType: 'pointer',
  headings: {
    fontFamily: 'Chroma ST, sans-serif',
    sizes: {
      h1: {
        fontWeight: '900',
        fontSize: rem('64px'),
        lineHeight: '100%'
      },
      h2: {
        fontWeight: '700',
        fontSize: rem('40px'),
        lineHeight: '110%'
      },
      h3: {
        fontWeight: '700',
        fontSize: rem('32px'),
        lineHeight: '110%'
      }
    }
  },
  fontSizes: {
    heading2: rem('20px'),
    body1: rem('16px'),
    body2: rem('14px'),
    stat2: rem('32px'),
    stat3: rem('24px'),
    caption: rem('14px'),
    caption2: rem('12px'),
    heading4: rem('14px')
  },
  lineHeights: {
    body2: '120%',
    state2: '100%',
    stat3: rem('28.8px'),
    caption2: rem('14.4px'),
    heading4: rem('16.8px')
  },
  spacing: {
    xs: `${SPACING.xs}px`, // 8px
    sm: `${SPACING.sm}px`, // 16px
    md: `${SPACING.md}px`, // 24px
    lg: `${SPACING.lg}px`, // 32px
    xl: `${SPACING.xl}px`, // 48px
    xxl: `${SPACING.xxl}px` // 64px
  },
  radius: {
    xs: `${RADIUS.xs}px`, // 4px
    sm: `${RADIUS.sm}px`, // 6px
    md: `${RADIUS.md}px`, // 12px
    lg: `${RADIUS.lg}px`, // 24px
    xl: `${RADIUS.xl}px`, // 64px
    xxl: `${RADIUS.xxl}px` // 100px
  }
});
