import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ua', name: 'Українська' },
  { code: 'bg', name: 'Български' },
  { code: 'ro', name: 'Română' }
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.lang = langCode;
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
            : 'bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20'
        }`}
        onMouseEnter={() => setIsOpen(true)}
      >
        <Languages size={20} />
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
              isScrolled
                ? 'bg-white/90 dark:bg-gray-800/90'
                : 'bg-white/80 dark:bg-gray-800/80'
            } backdrop-blur-md border border-gray-200 dark:border-gray-700`}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200
                    ${i18n.language === language.code
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};