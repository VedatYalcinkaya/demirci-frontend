import React from 'react';
import { Timeline } from './ui/timeline';
import { useTranslation } from 'react-i18next';

export function WebTimeline() {
  const { t } = useTranslation();

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
      <Timeline data={timelineData} />
    </div>
  );
} 