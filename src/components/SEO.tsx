import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  const seoData = translations[lang as keyof typeof translations] || translations.en;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Vladyslav Sheiko - Senior Software Engineer" />
      <meta property="og:description" content="Senior Software Engineer specializing in .NET, React, Angular, and database development with over 7 years of experience." />
      <meta property="og:image" content="https://liquiz.dev/assets/images/og.png" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="420" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vladyslav Sheiko - Senior Software Engineer" />
      <meta name="twitter:description" content="Senior Software Engineer specializing in .NET, React, Angular, and database development with over 7 years of experience." />
      <meta name="twitter:image" content="https://liquiz.dev/assets/images/og.png" />

      {/* LinkedIn (uses Open Graph) */}
      <meta property="og:site_name" content="Vladyslav Sheiko" />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Vladyslav Sheiko" />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Vladyslav Sheiko",
          "jobTitle": "Senior Software Engineer",
          "description": "Senior Software Engineer specializing in .NET, React, Angular, and database development with over 7 years of experience.",
          "image": "https://liquiz.dev/assets/images/og.png",
          "url": typeof window !== 'undefined' ? window.location.href : '',
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