interface NumberFormatterOptions {
  fractionDigits?: number;
  locale?: string;
}

interface DateFormatterOptions {
  locale?: string;
  day?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  year?: 'numeric' | '2-digit';
}

export const currencyFormatter = (
  value: number,
  { fractionDigits = 2, locale = 'en-US' }: NumberFormatterOptions = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const percentFormatter = (
  value: number,
  { fractionDigits = 0, locale = 'en-US' }: NumberFormatterOptions = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const dateFormatter = (
  value: string | number | Date | null | undefined,
  { locale = 'en-US', ...options }: DateFormatterOptions = {}
) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  return new Intl.DateTimeFormat(locale, options).format(date);
};
