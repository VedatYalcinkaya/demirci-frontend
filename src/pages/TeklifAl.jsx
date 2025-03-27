import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { QuoteForm } from '../components/ui/quote-form';
import { ReferansPinSection } from '../components/ui/ReferansPin';

const TeklifAl = () => {
  const { t } = useTranslation();

  // Çeviri anahtarlarını kullanan referans verileri
  const referanslar = [
    {
      referenceKey: "duruAnkastre",
      image: "/vite.svg",
      href: "https://www.duruankastre.com/",
      bgColor: "from-emerald-500 via-teal-500 to-blue-500"
    },
    {
      referenceKey: "kartvizitBahcesi",
      image: "/vite.svg",
      href: "https://www.kartvizitbahcesi.com/",
      bgColor: "from-blue-500 via-indigo-500 to-purple-500"
    },
    {
      referenceKey: "alternatifBant",
      image: "/vite.svg",
      href: "https://www.alternatifbant.com/",
      bgColor: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      referenceKey: "ankastreConcept",
      image: "/vite.svg",
      href: "https://www.ankastreconcept.com/",
      bgColor: "from-purple-500 via-pink-500 to-rose-500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('form.title')} | Demirci Yazılım</title>
        <meta name="description" content={t('form.subtitle')} />
      </Helmet>

      <div className="min-h-screen w-full py-12 md:py-20">
        {/* Hero Başlık */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 mb-8 md:mb-16 text-center"
        >
          <div className="inline-block mb-4 md:mb-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 opacity-25 blur-xl"></div>
              <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-white py-2 px-4">
                {t('form.title')}
              </h1>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('form.subtitle')}
          </p>
        </motion.div>

        {/* Form Alanı */}
        <div className="container mx-auto px-4 max-w-4xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Arka plan efekti - gradient glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-30"></div>
            
            {/* Form container */}
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Soldan sağa gradient şerit */}
              <div className="absolute h-1 top-0 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600"></div>
              
              <div className="p-6 md:p-8 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {/* Sol taraf - bilgi metni */}
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">
                        {t('form.callToAction')}
                      </h2>
                      <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                        {t('form.benefitsDescription')}
                      </p>
                      
                      <ul className="space-y-2 md:space-y-3">
                        {[
                          'form.benefits.responsive',
                          'form.benefits.customized',
                          'form.benefits.support',
                          'form.benefits.quality'
                        ].map((benefit, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                            className="flex items-center"
                          >
                            <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-emerald-500 mr-2 md:mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-200 text-sm md:text-base">{t(benefit)}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  
                  {/* Sağ taraf - form */}
                  <div className="md:col-span-3 bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <QuoteForm isStandalone={true} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        
        {/* Referanslar Bölümü */}
        <div>
          <ReferansPinSection 
            referanslar={referanslar}
            title={t('form.clientTrust')}
            description={t('form.clientTrustDescription')}
          />
        </div>
      </div>
    </>
  );
};

export default TeklifAl;