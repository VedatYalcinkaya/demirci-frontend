import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';

const aiFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Akıllı Çözümler",
    description: "İşletmenizin ihtiyaçlarına özel yapay zeka destekli çözümler geliştiriyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Otomatik Süreçler",
    description: "Tekrarlayan işlerinizi otomatikleştirerek zaman ve maliyet tasarrufu sağlıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Veri Analizi",
    description: "Büyük veri setlerini analiz ederek işletmeniz için değerli içgörüler sunuyoruz."
  }
];

const YapayZeka = () => {
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
          Veri Analizi ve <br />
          <ColourfulText text="Yapay Zeka" className="mt-2" colorTheme="indigo" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          İşletmenizin verilerini analiz ederek, yapay zeka destekli çözümler sunuyoruz.
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg" />
            <div className="px-8 py-3 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Teklif Alın
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Özellikler */}
      <Features features={aiFeatures} iconColor="indigo" />

      {/* Hizmetler */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Veri Analizi</h3>
            <p className="text-neutral-400">İşletmenizin verilerini analiz ederek anlamlı içgörüler elde etmenizi sağlıyoruz.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Yapay Zeka Çözümleri</h3>
            <p className="text-neutral-400">İşletmenize özel yapay zeka modelleri geliştirerek iş süreçlerinizi otomatikleştiriyoruz.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Makine Öğrenmesi</h3>
            <p className="text-neutral-400">Verilerinizden öğrenen ve zamanla daha akıllı hale gelen sistemler geliştiriyoruz.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Doğal Dil İşleme</h3>
            <p className="text-neutral-400">Metinleri anlayan, analiz eden ve yanıtlayan yapay zeka sistemleri geliştiriyoruz.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Tahmine Dayalı Analitik</h3>
            <p className="text-neutral-400">Gelecekteki trendleri ve olayları tahmin eden modeller geliştiriyoruz.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Chatbot ve Asistanlar</h3>
            <p className="text-neutral-400">Müşterilerinizle etkileşime geçen ve onlara yardımcı olan akıllı chatbotlar geliştiriyoruz.</p>
          </div>
        </div>
      </div>

      {/* Teknolojiler */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Kullandığımız Teknolojiler</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">TensorFlow</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">PyTorch</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">Python</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">OpenAI API</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">Pandas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YapayZeka; 