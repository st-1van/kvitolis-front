    export const i18n = {
        defaultLocale: 'ua-Uk',
        locales: ['ua-Uk','en'],
    } as const;
    
    export type Locale = typeof i18n\['locales'\][number];