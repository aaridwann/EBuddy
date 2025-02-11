import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './EN.json';
import ID from './ID.json';

const resources = {
  id: {
    translation: {
      ...ID,
    },
  },
  en: {
    translation: {
      ...EN,
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
