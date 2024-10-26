import { defineStore } from 'pinia';
import { ref } from 'vue';
import i18n from '@/assets/translations/i18n';

type SupportedLocale = 'de' | 'en';

const getDefaultLocale = (): SupportedLocale => {
    const browserLocale = navigator.language.slice(0, 2);
    return (['de', 'en'].includes(browserLocale) ? browserLocale : 'de') as SupportedLocale;
};

export const centralStore = defineStore('central', () => {
    const locale = ref<SupportedLocale>(getDefaultLocale());
    const darkMode = ref<boolean>(localStorage.getItem('darkMode') === 'true' || false);

    i18n.global.locale.value = locale.value;

    function setLocale(newLocale: SupportedLocale) {
        i18n.global.locale.value = newLocale;
        locale.value = newLocale;
    }

    function toggleDarkMode() {
        darkMode.value = !darkMode.value;
        localStorage.setItem('darkMode', String(darkMode.value));
        document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light');
    }

    return {
        locale,
        setLocale,
        toggleDarkMode,
        darkMode
    };
});
