import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Sıkça sorulan sorular
  const faqQuestions = t('contactPage.faq.questions', { returnObjects: true });

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
            {t('contactPage.faq.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Projeleriniz ve hizmetlerimiz hakkında en çok sorulan soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>
      </motion.div>

      {/* Sıkça Sorulan Sorular */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 mb-16"
      >
        <div className="max-w-3xl mx-auto">
          {faqQuestions.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4 border border-white/10 rounded-lg overflow-hidden bg-black/30 backdrop-blur-md"
            >
              <button
                className="w-full flex justify-between items-center p-5 hover:bg-white/5 focus:outline-none"
                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={`h-6 w-6 transform ${activeQuestion === index ? 'rotate-180' : 'rotate-0'} text-emerald-400`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeQuestion === index ? 'auto' : 0,
                  opacity: activeQuestion === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 py-4 bg-white/5">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ek Sorular Bölümü */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-lg p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Başka Sorularınız mı Var?</h2>
          <p className="text-gray-300 mb-6">
            Burada cevabını bulamadığınız sorularınız için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
          </p>
          <div className="flex justify-center">
            <a
              href="/iletisim"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {t('contactPage.cta')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 