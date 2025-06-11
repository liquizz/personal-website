import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ua from './locales/ua.json';
import bg from './locales/bg.json';
import de from './locales/de.json';
import ro from './locales/ro.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      ua: {
        translation: ua
      },
      bg: {
        translation: bg
      },
      de: {
        translation: de
      },
      ro: {
        translation: ro
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;