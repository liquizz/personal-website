import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

export const Hero: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: isDark ? 0x3366ff : 0x000000,
          backgroundColor: isDark ? 0x111827 : 0xffffff,
          points: 10.00,
          maxDistance: 20.00,
          spacing: 20.00,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.setOptions({
        color: isDark ? 0x3366ff : 0x000000,
        backgroundColor: isDark ? 0x111827 : 0xffffff,
      });
    }
  }, [isDark, vantaEffect]);

  return (
    <section id="hero" ref={vantaRef} className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 dark:from-transparent dark:via-white/5 dark:to-white/20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:vladyslav.sheiko@outlook.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Mail size={20} />
                {t('hero.contactMe')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/vladyslav-sheiko"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 text-white rounded-lg hover:bg-gray-900/80 transition-colors backdrop-blur-sm shadow-lg"
              >
                <Linkedin size={20} />
                LinkedIn
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white rounded-lg hover:bg-white/90 dark:hover:bg-white/20 transition-colors backdrop-blur-sm shadow-lg border border-white/20"
              >
                <Download size={20} />
                {t('hero.downloadCV')}
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 backdrop-blur-md" />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Vladyslav Sheiko"
                className="rounded-full w-full h-full object-cover shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};