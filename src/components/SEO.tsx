import { useEffect } from 'react';

interface SEOProps {
  lang: string;
}

// Static English metadata, canonical, Open Graph and JSON-LD live in index.html so
// crawlers that don't execute JS still see them. This only localizes the title and
// description when the visitor switches language.
const translations = {
  en: {
    title: 'Vladyslav Sheiko - Senior Software Engineer',
    description: 'Senior Software Engineer specializing in .NET, React, Angular, and database development with over 7 years of experience.',
  },
  ua: {
    title: 'Владислав Шейко - Провідний Інженер-Програміст',
    description: 'Провідний інженер-програміст, що спеціалізується на .NET, React, Angular та розробці баз даних з більш ніж 7-річним досвідом.',
  },
  bg: {
    title: 'Владислав Шейко - Старши Софтуерен Инженер',
    description: 'Старши софтуерен инженер, специализиран в .NET, React, Angular и разработка на бази данни с над 7 години опит.',
  },
  de: {
    title: 'Vladyslav Sheiko - Senior Software Engineer',
    description: 'Senior Software Engineer spezialisiert auf .NET, React, Angular und Datenbankentwicklung mit über 7 Jahren Erfahrung.',
  },
  ro: {
    title: 'Vladyslav Sheiko - Inginer Software Senior',
    description: 'Inginer software senior specializat în .NET, React, Angular și dezvoltarea bazelor de date, cu peste 7 ani de experiență.',
  },
};

export const SEO: React.FC<SEOProps> = ({ lang }) => {
  useEffect(() => {
    const seoData = translations[lang as keyof typeof translations] || translations.en;

    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
    document.title = seoData.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seoData.description);
  }, [lang]);

  return null;
};
