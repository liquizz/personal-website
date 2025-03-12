import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'about', label: t('header.about') },
    { key: 'experience', label: t('header.experience') },
    { key: 'skills', label: t('header.skills') },
    { key: 'contact', label: t('header.contact') }
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-gray-900/70 shadow-lg backdrop-blur-md'
          : 'bg-transparent backdrop-blur-sm'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
      }}
    >
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      </div>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-800 dark:text-white'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            VS
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    : 'text-gray-800 dark:text-white/90 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                  : 'bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                  : 'bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20 dark:border-white/10"
          >
            {menuItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {t('header.toggleTheme')}
            </button>
          </motion.div>
        )}
      </nav>
    </header>
  );
};