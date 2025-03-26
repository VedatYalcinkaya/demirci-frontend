import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { ContactForm } from '../components/ui/contact-form';

const Contact = () => {
  const { t } = useTranslation();

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contactPage.title')}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">
            {t('contactPage.subtitle')}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            {t('contactPage.description')}
          </p>
        </div>
      </motion.div>

      {/* İletişim Bilgileri ve Form */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-white/10">
          <div className="flex flex-col md:flex-row">
            {/* İletişim Bilgileri */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/3 bg-gradient-to-br from-emerald-500/20 to-teal-700/20 p-8 text-white border-r border-white/10"
            >
              <h3 className="text-2xl font-bold mb-8">{t('contactPage.info.title')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.address.title')}</p>
                    <p className="mt-1">{t('contactPage.info.address.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.phone.title')}</p>
                    <a href="tel:+905303785281" className="mt-1 hover:text-emerald-300 transition-colors">
                      {t('contactPage.info.phone.value')}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.email.title')}</p>
                    <p className="mt-1">{t('contactPage.info.email.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaClock className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-emerald-100">{t('contactPage.info.workHours.title')}</p>
                    <p className="mt-1">{t('contactPage.info.workHours.value')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* İletişim Formu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full md:w-2/3 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('contactPage.form.title')}
              </h3>
              <p className="text-gray-300 mb-6">
                {t('contactPage.form.subtitle')}
              </p>
              
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Harita */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            {t('contactPage.map.title')}
          </h2>
        </div>
        
        <div className="h-96 bg-black/30 backdrop-blur-md rounded-lg overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900490384!2d29.099705376486276!3d40.99008592012693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8a8000e0001%3A0x3f3f3f3f3f3f3f3f!2zQXRhxZ9laGlyLCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1615000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Demirci Yazılım Ofis Konumu"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact; 