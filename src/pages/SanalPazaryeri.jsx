import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';
import { useTranslation } from 'react-i18next';

const SanalPazaryeri = () => {
  const { t } = useTranslation();
  
  const pazaryeriFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t('marketplacePage.features.wideCustomerBase.title'),
      description: t('marketplacePage.features.wideCustomerBase.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('marketplacePage.features.competitionAnalysis.title'),
      description: t('marketplacePage.features.competitionAnalysis.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('marketplacePage.features.optimalPricing.title'),
      description: t('marketplacePage.features.optimalPricing.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      title: t('marketplacePage.features.targetedAds.title'),
      description: t('marketplacePage.features.targetedAds.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: t('marketplacePage.features.dataAnalysis.title'),
      description: t('marketplacePage.features.dataAnalysis.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: t('marketplacePage.features.storeOptimization.title'),
      description: t('marketplacePage.features.storeOptimization.description')
    }
  ];

  return (
    <div className="min-h-screen w-full py-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          {t('marketplacePage.title')} <br />
          <ColourfulText text={t('marketplacePage.subtitle')} className="mt-2" colorTheme="purple" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          {t('marketplacePage.description')}
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-[3px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg" />
            <div className="px-8 py-3 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              {t('marketplacePage.cta')}
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Özellikler */}
      <Features features={pazaryeriFeatures} iconColor="purple" />


      {/* Pazaryerleri */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">{t('marketplacePage.marketplaces.title')}</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('marketplacePage.marketplaces.trendyol')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('marketplacePage.marketplaces.hepsiburada')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('marketplacePage.marketplaces.n11')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('marketplacePage.marketplaces.amazon')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('marketplacePage.marketplaces.gittigidiyor')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanalPazaryeri; 