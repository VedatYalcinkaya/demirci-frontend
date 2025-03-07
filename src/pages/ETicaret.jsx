import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { Features } from '../components/Features';

const eCommerceFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Güvenli Ödeme",
    description: "En güncel güvenlik protokolleriyle korunan ödeme sistemleri entegrasyonu sağlıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Çoklu Ödeme Seçenekleri",
    description: "Kredi kartı, havale, kapıda ödeme gibi farklı ödeme yöntemleri sunarak satışlarınızı artırıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Detaylı Raporlama",
    description: "Satış, ziyaretçi ve stok verilerinizi analiz ederek işletmenizi büyütmenize yardımcı oluyoruz."
  }
];

const ETicaret = () => {
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
          E-Ticaret <br />
          <ColourfulText text="Danışmanlığı" className="mt-2" colorTheme="orange" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          E-ticaret sitenizin kurulumundan, yönetimine kadar tüm süreçlerde profesyonel danışmanlık hizmeti sunuyoruz.
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg" />
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
      <Features features={eCommerceFeatures} iconColor="orange" />

      {/* Hizmetler */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">E-Ticaret Site Kurulumu</h3>
            <p className="text-neutral-400">WooCommerce, Shopify, Magento gibi platformlarda profesyonel e-ticaret sitesi kurulumu.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Ödeme Sistemleri</h3>
            <p className="text-neutral-400">Güvenli ve çok yönlü ödeme sistemlerinin entegrasyonu ve yönetimi.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Stok Yönetimi</h3>
            <p className="text-neutral-400">Etkili stok yönetimi sistemleri ve otomatik stok takibi çözümleri.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Kargo ve Lojistik</h3>
            <p className="text-neutral-400">Kargo firmaları entegrasyonu ve lojistik süreçlerin optimizasyonu.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">SEO Optimizasyonu</h3>
            <p className="text-neutral-400">E-ticaret sitesi için özel SEO stratejileri ve arama motoru optimizasyonu.</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Müşteri Deneyimi</h3>
            <p className="text-neutral-400">Kullanıcı dostu arayüz tasarımı ve müşteri deneyimini iyileştirme çözümleri.</p>
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-10">E-Ticaret Başarı Faktörleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-black/30 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">%68</div>
            <p className="text-white">Mobil cihazlardan yapılan alışveriş oranı</p>
          </div>
          <div className="bg-black/30 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">3 sn</div>
            <p className="text-white">Kullanıcıların site yüklenmesi için beklediği maksimum süre</p>
          </div>
          <div className="bg-black/30 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">%70</div>
            <p className="text-white">Sepeti terk etme oranı</p>
          </div>
          <div className="bg-black/30 p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">%89</div>
            <p className="text-white">Müşteri deneyiminin marka sadakatine etkisi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETicaret; 