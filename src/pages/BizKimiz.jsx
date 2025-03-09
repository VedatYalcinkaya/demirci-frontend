import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { WebTimeline } from '../components/WebTimeline';

const BizKimiz = () => {
  const { t } = useTranslation();

  const values = [
    'innovation',
    'quality',
    'customerFocus',
    'transparency'
  ];

  // Timeline verileri
  const timelineData = {
    title: t('aboutPage.timeline.title'),
    items: [
      {
        year: t('aboutPage.timeline.foundation.year'),
        title: t('aboutPage.timeline.foundation.title'),
        description: t('aboutPage.timeline.foundation.description')
      },
      {
        year: t('aboutPage.timeline.growth.year'),
        title: t('aboutPage.timeline.growth.title'),
        description: t('aboutPage.timeline.growth.description')
      },
      {
        year: t('aboutPage.timeline.international.year'),
        title: t('aboutPage.timeline.international.title'),
        description: t('aboutPage.timeline.international.description')
      },
      {
        year: t('aboutPage.timeline.innovation.year'),
        title: t('aboutPage.timeline.innovation.title'),
        description: t('aboutPage.timeline.innovation.description')
      },
      {
        year: t('aboutPage.timeline.today.year'),
        title: t('aboutPage.timeline.today.title'),
        description: t('aboutPage.timeline.today.description')
      }
    ]
  };

  // WebTimeline için veri formatı
  const webTimelineData = [
    {
      title: t('aboutPage.timeline.foundation.year'),
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('aboutPage.timeline.foundation.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('aboutPage.timeline.foundation.description')}
          </p>
        </div>
      ),
    },
    {
      title: t('aboutPage.timeline.growth.year'),
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('aboutPage.timeline.growth.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('aboutPage.timeline.growth.description')}
          </p>
        </div>
      ),
    },
    {
      title: t('aboutPage.timeline.international.year'),
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('aboutPage.timeline.international.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('aboutPage.timeline.international.description')}
          </p>
        </div>
      ),
    },
    {
      title: t('aboutPage.timeline.innovation.year'),
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('aboutPage.timeline.innovation.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('aboutPage.timeline.innovation.description')}
          </p>
        </div>
      ),
    },
    {
      title: t('aboutPage.timeline.today.year'),
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('aboutPage.timeline.today.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('aboutPage.timeline.today.description')}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('aboutPage.whoWeAre.title')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-8">
            {t('aboutPage.whoWeAre.subtitle')}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {t('aboutPage.whoWeAre.description')}
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            {t('aboutPage.whoWeAre.values.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-center mb-4 text-emerald-400">
                  {value === 'innovation' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {value === 'quality' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {value === 'customerFocus' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {value === 'transparency' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  {t(`aboutPage.whoWeAre.values.${value}.title`)}
                </h3>
                <p className="text-gray-400 text-center">
                  {t(`aboutPage.whoWeAre.values.${value}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Timeline */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0.5, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('aboutPage.timeline.title')}
          </h2>
        </motion.div>
        <WebTimeline customData={webTimelineData} />
      </div>
    </div>
  );
};

export default BizKimiz; 