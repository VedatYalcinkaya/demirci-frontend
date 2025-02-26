import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive Tasarım",
    description: "Tüm cihazlarda mükemmel görünen, kullanıcı dostu web siteleri tasarlıyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Hızlı Yükleme",
    description: "Optimize edilmiş kodlama ile hızlı açılan web siteleri geliştiriyoruz."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO Uyumlu",
    description: "Arama motorlarında üst sıralarda yer almanızı sağlayan SEO optimizasyonu yapıyoruz."
  }
];

export function WebFeatures() {
  return (
    <div className="container mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="text-emerald-500 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-neutral-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 