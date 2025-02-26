import React from 'react';
import { motion } from 'framer-motion';
import { ColourfulText } from '../components/ui/colourful-text';
import { WebFeatures } from '../components/WebFeatures';
import { WebTimeline } from '../components/WebTimeline';

const WebTasarim = () => {
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
          Modern Web Tasarım <br />
          <ColourfulText text="Çözümleri" className="mt-2" />
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          Markanızı dijital dünyada en iyi şekilde temsil eden, modern ve kullanıcı dostu web siteleri tasarlıyoruz.
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
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-emerald-800/30 bg-[linear-gradient(110deg,#042f2e,45%,#065f46,55%,#042f2e)] bg-[length:200%_100%] px-6 font-medium text-emerald-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Teklif Alın
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Özellikler */}
      <WebFeatures />

      {/* Süreç Timeline */}
      <div className="mb-20">
        <WebTimeline />
      </div>
    </div>
  );
};

export default WebTasarim; 


