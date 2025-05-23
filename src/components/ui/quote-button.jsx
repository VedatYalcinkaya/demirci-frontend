import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const QuoteButton = ({ colorTheme = 'emerald', width = '200px', onClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Renk temalarını tanımla
  const colorVariants = {
    emerald: 'from-emerald-500 to-green-500',
    violet: 'from-purple-500 to-violet-500',
    amber: 'from-orange-500 to-amber-500',
    rose: 'from-red-500 to-rose-500',
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-violet-500',
    indigo: 'from-indigo-500 to-blue-500'
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/teklif-al');
    }
  };

  return (
    <div className="inline-block cursor-pointer" onClick={handleClick}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-[3px] relative"
        style={{ width }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${colorVariants[colorTheme] || colorVariants.emerald} rounded-lg`} />
        <div className="px-8 py-3 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center w-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 flex-shrink-0" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <span className="whitespace-nowrap">{t('common.getQuote')}</span>
        </div>
      </motion.div>
    </div>
  );
}; 