import React from 'react';
import { Timeline } from './ui/timeline';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Standart WebTimeline bileşeni - WebTasarim sayfası için
export function WebTimeline({ customData, type = "default" }) {
  const { t } = useTranslation();

  // Eğer özel veri sağlanmışsa, onu kullan
  if (type === "company") {
    return <CompanyTimeline data={customData} />;
  }

  // Varsayılan web tasarım zaman çizelgesi
  const timelineData = [
    {
      title: "01",
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('webDesignPage.timeline.step1.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('webDesignPage.timeline.step1.description')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step1.analysis.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step1.analysis.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step1.content.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step1.content.description')}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "02",
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('webDesignPage.timeline.step2.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('webDesignPage.timeline.step2.description')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step2.uiux.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step2.uiux.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step2.responsive.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step2.responsive.description')}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "03",
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('webDesignPage.timeline.step3.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('webDesignPage.timeline.step3.description')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step3.tech.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step3.tech.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step3.seo.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step3.seo.description')}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "04",
      content: (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{t('webDesignPage.timeline.step4.title')}</h3>
          <p className="text-neutral-200 text-base mb-6">
            {t('webDesignPage.timeline.step4.description')}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step4.quality.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step4.quality.description')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-emerald-500 font-semibold mb-2">{t('webDesignPage.timeline.step4.support.title')}</h4>
              <p className="text-neutral-300 text-sm">{t('webDesignPage.timeline.step4.support.description')}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={customData || timelineData} />
    </div>
  );
}

// Şirket zaman çizelgesi bileşeni - BizKimiz sayfası için
const CompanyTimeline = ({ data }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-16"
        >
          {data.title}
        </motion.h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-500"></div>
          
          {/* Timeline Items */}
          <div className="space-y-20">
            {data.items.map((item, index) => (
              <TimelineItem 
                key={index}
                year={item.year} 
                title={item.title} 
                description={item.description}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Timeline Item Component
const TimelineItem = ({ year, title, description, isLeft }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className="w-1/2"></div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-black border-4 border-emerald-500 z-10"></div>
      
      <div className={`w-1/2 ${isLeft ? 'pl-8' : 'pr-8'}`}>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500 bg-opacity-20 text-emerald-400 font-bold mb-4">{year}</span>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}; 