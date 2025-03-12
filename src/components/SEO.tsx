import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  lang: string;
}

const translations = {
  en: {
    title: 'Vladyslav Sheiko - Senior Software Engineer',
    description: 'Senior Software Engineer specializing in .NET, React, Angular, and database development with over 7 years of experience.',
    keywords: '.NET, React, Angular, Software Engineer, Full Stack Developer, Backend Developer, Frontend Developer',
  },
  ua: {
    title: 'Владислав Шейко - Провідний Інженер-Програміст',
    description: 'Провідний інженер-програміст, що спеціалізується на .NET, React, Angular та розробці баз даних з більш ніж 7-річним досвідом.',
    keywords: '.NET, React, Angular, Інженер-Програміст, Full Stack Розробник, Backend Розробник, Frontend Розробник',
  },
  bg: {
    title: 'Владислав Шейко - Старши Софтуерен Инженер',
    description: 'Старши софтуерен инженер, специализиран в .NET, React, Angular и разработка на бази данни с над 7 години опит.',
    keywords: '.NET, React, Angular, Софтуерен Инженер, Full Stack Разработчик, Backend Разработчик, Frontend Разработчик',
  },
  de: {
    title: 'Vladyslav Sheiko - Senior Software Engineer',
    description: 'Senior Software Engineer spezialisiert auf .NET, React, Angular und Datenbankentwicklung mit über 7 Jahren Erfahrung.',
    keywords: '.NET, React, Angular, Software Engineer, Full Stack Entwickler, Backend Entwickler, Frontend Entwickler',
  },
};

export const SEO: React.FC<SEOProps> = ({ lang }) => {
  const { t } = useTranslation();
  const seoData = translations[lang as keyof typeof translations] || translations.en;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Vladyslav Sheiko" />
      <link rel="canonical" href={window.location.href} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Vladyslav Sheiko",
          "jobTitle": t('hero.title'),
          "description": seoData.description,
          "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
          "url": window.location.href,
          "sameAs": [
            "https://www.linkedin.com/in/vladyslav-sheiko"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "boostCX"
          }
        })}
      </script>
    </Helmet>
  );
};