import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import en_usTranslation from './assets/i18n/en_us.json';
import zh_cnTranslation from './assets/i18n/zh_cn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en_us: {
        translation: en_usTranslation.translation,
      },
      zh_cn: {
        translation: zh_cnTranslation.translation,
      },
    },
    lng: 'en_us', // Explicitly set the language
    fallbackLng: 'en_us',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;