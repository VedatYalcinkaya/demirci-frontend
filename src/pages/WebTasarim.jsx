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
            className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
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