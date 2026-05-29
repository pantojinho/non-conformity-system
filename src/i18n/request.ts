import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, type Locale } from './config';
import { cookies } from 'next/headers';

export default getRequestConfig(async ({ requestLocale }) => {
  // Try to get locale from: 1) requestLocale, 2) cookie, 3) default
  let locale: Locale = defaultLocale;

  try {
    // Check cookie first (set by our custom middleware or language switcher)
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
    if (cookieLocale && ['pt-BR', 'en-US', 'es-AR'].includes(cookieLocale)) {
      locale = cookieLocale as Locale;
    } else if (requestLocale) {
      const resolved = await requestLocale;
      if (resolved && ['pt-BR', 'en-US', 'es-AR'].includes(resolved)) {
        locale = resolved as Locale;
      }
    }
  } catch {
    // cookies() might not be available in some contexts
    const resolved = await requestLocale;
    if (resolved && ['pt-BR', 'en-US', 'es-AR'].includes(resolved)) {
      locale = resolved as Locale;
    }
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
  };
});