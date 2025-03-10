import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';
import { useTranslation } from 'react-i18next';
import { QuoteButton } from '../components/ui/quote-button';

const YapayZeka = () => {
  const { t } = useTranslation();
  
  const aiFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: t('aiPage.features.smartSolutions.title'),
      description: t('aiPage.features.smartSolutions.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: t('aiPage.features.automatedProcesses.title'),
      description: t('aiPage.features.automatedProcesses.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('aiPage.features.dataAnalysis.title'),
      description: t('aiPage.features.dataAnalysis.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: t('aiPage.features.chatbotDevelopment.title'),
      description: t('aiPage.features.chatbotDevelopment.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: t('aiPage.features.nlp.title'),
      description: t('aiPage.features.nlp.description')
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: t('aiPage.features.customAiModels.title'),
      description: t('aiPage.features.customAiModels.description')
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
          {t('aiPage.title')} <br />
          <ColourfulText text={t('aiPage.subtitle')} className="mt-2" colorTheme="indigo" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          {t('aiPage.description')}
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <QuoteButton colorTheme="indigo" />
        </motion.div>
      </motion.div>

      {/* Özellikler */}
      <Features features={aiFeatures} iconColor="indigo" />

      {/* Teknolojiler */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">{t('aiPage.technologies.title')}</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('aiPage.technologies.tensorflow')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('aiPage.technologies.pytorch')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('aiPage.technologies.python')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('aiPage.technologies.openai')}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">{t('aiPage.technologies.pandas')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YapayZeka; 