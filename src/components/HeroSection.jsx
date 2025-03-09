"use client";
import React from "react";
import { FlipWords } from "./ui/flip-words";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  
  // Çeviri dosyasından kelimeleri al
  const words = t('hero.flipWords', { returnObjects: true });

  return (
    <div className="relative min-h-[80vh] md:min-h-[80vh] flex flex-col justify-center items-center px-4 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight mb-2 sm:mb-3 md:mb-4">
            <span className="text-neutral-400">{t('hero.ideaFromYou')}</span>
          </h1>
          
          <div className="h-[45px] sm:h-[45px] md:h-[55px] lg:h-[70px] flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
            <FlipWords 
              words={words} 
              className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl text-emerald-500 font-bold"
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-400">
            {t('hero.fromUs')}
          </h1>
        </div>
        
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8 px-4">
          {t('hero.subtitle')}
        </p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
        >
          {t('hero.cta')}
        </motion.button>
      </motion.div>
    </div>
  );
} 