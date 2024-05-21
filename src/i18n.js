import { createI18n } from 'vue-i18n';
import en from '../src/locales/español.json';
import es from '../src/locales/ingles.json';

const messages = {
  en,
  es
};

const i18n = createI18n({
  locale: 'en', // idioma predeterminado
  fallbackLocale: 'en',
  messages,
});

export default i18n;
