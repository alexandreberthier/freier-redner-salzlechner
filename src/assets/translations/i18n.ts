// i18n.ts
import { createI18n } from 'vue-i18n';
import de from '@/assets/translations/de.json';
import en from '@/assets/translations/en.json';

const messages = {
    de,
    en,
};

const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
