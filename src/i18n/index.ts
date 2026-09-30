import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ua from './locales/ua.json';
import bg from './locales/bg.json';
import de from './locales/de.json';
import ro from './locales/ro.json';

const supportedLanguages = ['en', 'de', 'ua', 'bg', 'ro'];
// Same key the previous i18next-browser-languagedetector setup used, so returning
// visitors keep their chosen language.
const STORAGE_KEY = 'i18nextLng';

// Stored choice first, then the browser's preferred languages. Browsers report
// Ukrainian as "uk"; this site's code for it is "ua".
export function detectLanguage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && supportedLanguages.includes(stored)) return stored;
  } catch {
    // Storage unavailable: fall through to the browser languages.
  }

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0];
    const code = base === 'uk' ? 'ua' : base;
    if (supportedLanguages.includes(code)) return code;
  }
  return 'en';
}

export function persistLanguage(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Storage unavailable: the choice applies for this visit only.
  }
}

i18n
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
    // Always start in English to match the prerendered HTML; App switches to
    // detectLanguage() after hydration.
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
