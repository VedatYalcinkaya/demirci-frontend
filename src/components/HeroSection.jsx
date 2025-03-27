"use client";
import React from "react";
import { FlipWords } from "./ui/flip-words";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { QuoteButton } from "./ui/quote-button";

export function HeroSection({ onCtaClick }) {
  const { t } = useTranslation();
  
  // Çeviri dosyasından kelimeleri al
  const words = t('hero.flipWords', { returnObjects: true });
  
  // Her iki buton için aynı genişlik tanımı
  const buttonWidth = "250px";

  return (
    <div className="relative min-h-[70vh] md:min-h-[70vh] flex flex-col justify-center items-center px-4 py-10 overflow-hidden">
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="cursor-pointer" onClick={onCtaClick}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-[3px] relative"
              style={{ width: buttonWidth }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg" />
              <div className="px-8 py-3 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center w-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 flex-shrink-0" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">{t('hero.cta')}</span>
              </div>
            </motion.div>
          </div>
          
          <QuoteButton colorTheme="emerald" width={buttonWidth} />
        </motion.div>
      </motion.div>
    </div>
  );
} 