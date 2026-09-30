import React, { Component, Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { m } from 'framer-motion';
import { Mail, Linkedin, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

// three.js + react-three-fiber are the bulk of the JS; load them in a separate
// chunk so the hero text paints without waiting for the 3D scene.
const PortalScene = lazy(() =>
  import('./3d/PortalScene').then((m) => ({ default: m.PortalScene }))
);

// If WebGL is unavailable or the scene throws, keep the rest of the page alive.
class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Mount the scene only once the page has loaded and the main thread is idle, so
// parsing/compiling the three.js chunk doesn't compete with first paint and input.
function useIdleAfterLoad(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      } else {
        timeoutId = window.setTimeout(() => setReady(true), 200);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return ready;
}

export const Hero: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ initialInView: true });
  const showScene = useIdleAfterLoad();

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0 bg-[#f0f4f8] dark:bg-[#02050d]" />
      {/* Rendered only after hydration: a Suspense boundary in the prerendered HTML
          would be forced back to client rendering by the updates that follow. */}
      {showScene && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <PortalScene isDark={isDark} active={inView} />
          </Suspense>
        </SceneErrorBoundary>
      )}

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-black/5 to-black/20 dark:from-transparent dark:via-white/5 dark:to-white/20" />
      
      {/* Content - always on top */}
      <div className="container mx-auto px-6 relative z-30">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <m.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 backdrop-blur-md bg-white/30 dark:bg-black/30 p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] border border-white/20 dark:border-white/10"
            style={{
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Vladyslav Sheiko
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-6">
              {t('hero.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <m.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:vladyslav.sheiko@outlook.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Mail size={20} />
                {t('hero.contactMe')}
              </m.a>
              <m.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/vladyslav-sheiko"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 text-white rounded-lg hover:bg-gray-900/80 transition-colors backdrop-blur-sm shadow-lg"
              >
                <Linkedin size={20} />
                LinkedIn
              </m.a>
              <m.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/assets/files/VladyslavSheikoResume.pdf"
                download="Vladyslav_Sheiko_CV.pdf"
                className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white rounded-lg hover:bg-white/90 dark:hover:bg-white/20 transition-colors backdrop-blur-sm shadow-lg border border-white/20"
              >
                <Download size={20} />
                {t('hero.downloadCV')}
              </m.a>
            </div>
          </m.div>
          <m.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 backdrop-blur-md" />
              <img
                src="/assets/images/avatar-460.webp"
                srcSet="/assets/images/avatar-256.webp 256w, /assets/images/avatar-460.webp 460w"
                sizes="(min-width: 768px) 384px, 256px"
                alt="Vladyslav Sheiko"
                width={384}
                height={384}
                decoding="async"
                className="rounded-full w-full h-full object-cover shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]" />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};