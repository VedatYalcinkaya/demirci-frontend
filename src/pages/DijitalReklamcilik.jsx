import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';
import { useTranslation } from 'react-i18next';
import { QuoteButton } from '../components/ui/quote-button';

const DijitalReklamcilik = () => {
  const { t } = useTranslation();
  
  const reklamFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      title: t('digitalAdvertisingPage.features.targetedAds.title'),
      description: t('digitalAdvertisingPage.features.targetedAds.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('digitalAdvertisingPage.features.performanceTracking.title'),
      description: t('digitalAdvertisingPage.features.performanceTracking.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('digitalAdvertisingPage.features.budgetControl.title'),
      description: t('digitalAdvertisingPage.features.budgetControl.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: t('digitalAdvertisingPage.features.multiPlatform.title'),
      description: t('digitalAdvertisingPage.features.multiPlatform.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: t('digitalAdvertisingPage.features.detailedAnalysis.title'),
      description: t('digitalAdvertisingPage.features.detailedAnalysis.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      title: t('digitalAdvertisingPage.features.keywordOptimization.title'),
      description: t('digitalAdvertisingPage.features.keywordOptimization.description')
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
          {t('digitalAdvertisingPage.title')} <br />
          <ColourfulText text={t('digitalAdvertisingPage.subtitle')} className="mt-2" colorTheme="red" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          {t('digitalAdvertisingPage.description')}
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <QuoteButton colorTheme="rose" />
        </motion.div>
      </motion.div>

      {/* Özellikler */}
      <Features features={reklamFeatures} iconColor="red" />


      {/* Platformlar */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">{t('digitalAdvertisingPage.platforms.title')}</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('digitalAdvertisingPage.platforms.googleAds')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('digitalAdvertisingPage.platforms.facebookAds')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('digitalAdvertisingPage.platforms.instagramAds')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('digitalAdvertisingPage.platforms.linkedinAds')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('digitalAdvertisingPage.platforms.youtubeAds')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DijitalReklamcilik; 