import { NumberFormatOptions, useFormatter } from 'next-intl';

interface FormatNumbersParams {
  value: number;
  nextIntlFormatter: ReturnType<typeof useFormatter>;
  options?: NumberFormatOptions;
}

function buildZeroString(num: number): string {
  if (num === 0) {
    return '';
  }
  const zeros = '0'.repeat(num);
  return `.${zeros}`;
}
export function formatNumber({ value, nextIntlFormatter, options }: FormatNumbersParams): string {
  let defaultOptions: NumberFormatOptions = {};
  switch (options?.style) {
    case undefined:
    case 'decimal':
    case 'percent':
    case 'currency':
    case 'unit':
      defaultOptions = {
        ...defaultOptions,
        maximumFractionDigits: 2
      };
      break;
    default:
      break;
  }

  const mergedOptions = { ...defaultOptions, ...options };
  const formattedValue = nextIntlFormatter.number(value, mergedOptions);

  return formattedValue.replace(buildZeroString(mergedOptions.maximumFractionDigits || 0), '');
}
