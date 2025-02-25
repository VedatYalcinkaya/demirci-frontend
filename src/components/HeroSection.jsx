"use client";
import React from "react";
import { FlipWords } from "./ui/flip-words";
import { motion } from "framer-motion";

export function HeroSection() {
  const words = [
    "Website",
    "Reklam",
    "Pazarlama",
    "E-ticaret",
    "SEO",
    "Sosyal Medya",
    "Mobil Uygulama",
    "Logo Tasarımı",
    "Marka Kimliği",
    "Yazılım"
  ];

  return (
    <div className="min-h-[vh] flex flex-col justify-center items-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
          <span className="text-neutral-400">Fikir</span> Sizden,
          <br />
          <FlipWords 
            words={words} 
            className="text-emerald-500 font-bold"
          /> 
          <span className="text-neutral-400">Bizden.</span>
        </h1>
        
        <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mt-4">
          Dijital dünyada markanızı öne çıkaracak yaratıcı çözümler sunuyoruz.
        </p>
      </motion.div>
    </div>
  )
} 