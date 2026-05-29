import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale || defaultLocale;

  // Validate locale
  if (!['pt-BR', 'en-US', 'es-AR'].includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
  };
});