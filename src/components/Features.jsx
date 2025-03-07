import React from 'react';
import { motion } from 'framer-motion';

// Renk sınıfları için yardımcı fonksiyon
const getIconColorClass = (colorName) => {
  const colorMap = {
    emerald: "text-emerald-500",
    sky: "text-sky-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    red: "text-red-500",
    indigo: "text-indigo-500"
  };
  
  return colorMap[colorName] || "text-emerald-500";
};

export function Features({ features, iconColor }) {
  const iconColorClass = getIconColorClass(iconColor);
  
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
            <div className={`${iconColorClass} mb-4`}>
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