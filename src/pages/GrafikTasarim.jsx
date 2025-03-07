import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';

const grafikFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Yaratıcı Tasarım",
    description: "Markanızı en iyi şekilde yansıtan özgün ve yaratıcı tasarımlar oluşturuyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Marka Tutarlılığı",
    description: "Tüm tasarımlarınızda marka kimliğinizi tutarlı bir şekilde yansıtıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Yüksek Kalite",
    description: "Her türlü baskı ve dijital ortam için yüksek çözünürlüklü tasarımlar sunuyoruz."
  }
];

const GrafikTasarim = () => {
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
          Yaratıcı Grafik Tasarım <br />
          <ColourfulText text="Çözümleri" className="mt-2" colorTheme="sky" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          Markanızın kimliğini güçlendiren yaratıcı ve etkileyici grafik tasarım çözümleri sunuyoruz.
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
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg" />
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
      <Features features={grafikFeatures} iconColor="sky" />

      {/* Hizmetler */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Logo Tasarımı</h3>
            <p className="text-neutral-400">Markanızı en iyi şekilde temsil eden, akılda kalıcı ve profesyonel logo tasarımları.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Kurumsal Kimlik</h3>
            <p className="text-neutral-400">Kartvizit, antetli kağıt, zarf ve diğer kurumsal kimlik elemanlarının tasarımı.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Sosyal Medya Tasarımları</h3>
            <p className="text-neutral-400">Sosyal medya platformları için dikkat çekici ve etkileşim alan görsel içerikler.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Ambalaj Tasarımı</h3>
            <p className="text-neutral-400">Ürünlerinizi öne çıkaran, marka değerinizi yansıtan ambalaj tasarımları.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Broşür ve Katalog</h3>
            <p className="text-neutral-400">Ürün ve hizmetlerinizi en iyi şekilde tanıtan broşür ve katalog tasarımları.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Banner ve Afiş</h3>
            <p className="text-neutral-400">Dijital ve basılı mecralarda kullanılmak üzere etkili banner ve afiş tasarımları.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafikTasarim; 