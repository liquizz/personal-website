import React, { useEffect, useSyncExternalStore } from 'react';
import { LazyMotion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { SEO } from './components/SEO';
import { useTranslation } from 'react-i18next';
import { detectLanguage } from './i18n';

const loadMotionFeatures = () => import('./utils/motionFeatures').then((mod) => mod.default);

const getIsDark = () => document.documentElement.classList.contains('dark');

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

function App() {
  // The theme lives in the <html> "dark" class, set before paint by public/theme-init.js.
  // During hydration React uses the server snapshot (light, as prerendered), then the real value.
  const isDark = useSyncExternalStore(subscribeToTheme, getIsDark, () => false);

  const { i18n } = useTranslation();

  // The prerendered HTML is English; switch to the visitor's language after hydration.
  useEffect(() => {
    i18n.changeLanguage(detectLanguage());
  }, [i18n]);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Storage unavailable: the theme still applies for this visit.
    }
  };

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <SEO lang={i18n.language} />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <Hero isDark={isDark} />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </LazyMotion>
  );
}

export default App;