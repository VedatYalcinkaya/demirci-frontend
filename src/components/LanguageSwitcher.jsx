import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = languages[i18n.language] || languages.tr;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-black/20 hover:bg-black/30 text-white transition-colors"
      >
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/80 backdrop-blur-sm ring-1 ring-white/10 z-50"
          >
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-400 border-b border-white/10">
                {t('language.select')}
              </div>
              {Object.keys(languages).map((lng) => (
                <button
                  key={lng}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                    i18n.language === lng ? 'text-emerald-400' : 'text-white'
                  }`}
                  onClick={() => changeLanguage(lng)}
                >
                  <span>{languages[lng].flag}</span>
                  <span>{languages[lng].nativeName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher; 