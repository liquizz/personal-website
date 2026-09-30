import { useEffect } from 'react';

interface SEOProps {
  lang: string;
}

// Static English metadata, canonical, Open Graph and JSON-LD live in index.html so
// crawlers that don't execute JS still see them. This only localizes the title and
// description when the visitor switches language.
const translations = {
  en: {
    title: 'Vladyslav Sheiko - Senior Full-Stack .NET Engineer',
    description: 'Senior Full-Stack .NET Engineer specializing in .NET, React, Angular, and database development with over 7 years of experience in Fintech, CXM, consulting, and IoT.',
  },
  ua: {
    title: 'Владислав Шейко - Провідний Full-Stack .NET Інженер',
    description: 'Провідний full-stack .NET інженер, що спеціалізується на .NET, React, Angular та розробці баз даних з більш ніж 7-річним досвідом у фінтеху, CXM, консалтингу та IoT.',
  },
  bg: {
    title: 'Владислав Шейко - Старши Full-Stack .NET Инженер',
    description: 'Старши full-stack .NET инженер, специализиран в .NET, React, Angular и разработка на бази данни с над 7 години опит във финтех, CXM, консултиране и IoT.',
  },
  de: {
    title: 'Vladyslav Sheiko - Senior Full-Stack .NET Engineer',
    description: 'Senior Full-Stack .NET Engineer spezialisiert auf .NET, React, Angular und Datenbankentwicklung mit über 7 Jahren Erfahrung in Fintech, CXM, Beratung und IoT.',
  },
  ro: {
    title: 'Vladyslav Sheiko - Inginer Full-Stack .NET Senior',
    description: 'Inginer full-stack .NET senior specializat în .NET, React, Angular și dezvoltarea bazelor de date, cu peste 7 ani de experiență în fintech, CXM, consultanță și IoT.',
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
