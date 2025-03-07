import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';

const reklamFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: "Hedefli Reklamlar",
    description: "Potansiyel müşterilerinize demografik, ilgi alanı ve davranış bazlı hedefleme ile ulaşıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Performans Takibi",
    description: "Reklam kampanyalarınızın performansını gerçek zamanlı olarak izleyerek optimizasyon sağlıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Bütçe Kontrolü",
    description: "Reklam bütçenizi en verimli şekilde kullanarak maksimum geri dönüş sağlıyoruz."
  }
];

const DijitalReklamcilik = () => {
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
          Dijital Reklamcılık <br />
          <ColourfulText text="Hizmetleri" className="mt-2" colorTheme="red" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          Google Ads, Facebook Ads ve diğer dijital reklam platformlarında etkili kampanyalar oluşturuyoruz.
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg" />
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
      <Features features={reklamFeatures} iconColor="red" />

      {/* Hizmetler */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Google Ads</h3>
            <p className="text-neutral-400">Arama ağı, görüntülü reklam ağı ve YouTube reklamları ile hedef kitlenize ulaşın.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Facebook & Instagram Ads</h3>
            <p className="text-neutral-400">Sosyal medya platformlarında etkili ve hedefli reklam kampanyaları.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">LinkedIn Reklamları</h3>
            <p className="text-neutral-400">B2B pazarlama için profesyonel ağda hedefli reklam stratejileri.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Remarketing</h3>
            <p className="text-neutral-400">Sitenizi ziyaret eden kullanıcılara yeniden ulaşarak dönüşüm oranlarını artırın.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Performans Analizi</h3>
            <p className="text-neutral-400">Reklam kampanyalarının performansını analiz ederek sürekli optimizasyon.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Reklam Metni Oluşturma</h3>
            <p className="text-neutral-400">Dönüşüm odaklı, etkileyici reklam metinleri ve görselleri hazırlama.</p>
          </div>
        </div>
      </div>

      {/* Platformlar */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Reklam Platformları</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">Google Ads</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">Facebook Ads</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">Instagram Ads</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">LinkedIn Ads</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
            <p className="text-white font-semibold text-xl">YouTube Ads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DijitalReklamcilik; 