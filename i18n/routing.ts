import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uz', 'en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
