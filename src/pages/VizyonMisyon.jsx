import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const VizyonMisyon = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen text-white overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('aboutPage.visionMission.title')}
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 mb-6"></div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-emerald-500 opacity-10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-center justify-center mb-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
              {t('aboutPage.visionMission.vision.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-300 relative z-10">
              {t('aboutPage.visionMission.vision.description')}
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-emerald-500 opacity-10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-center justify-center mb-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
              {t('aboutPage.visionMission.mission.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-300 relative z-10">
              {t('aboutPage.visionMission.mission.description')}
            </p>
          </motion.div>
        </div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-10 md:py-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            {t('aboutPage.visionMission.goals.title')}
          </h2>
          
          <div className="max-w-4xl mx-auto px-2">
            {t('aboutPage.visionMission.goals.items', { returnObjects: true }).map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start md:items-center mb-6 md:mb-8 group"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-emerald-500 mr-4 md:mr-6 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                  <span className="text-xl md:text-2xl font-bold">{index + 1}</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg flex-grow hover:bg-white/10 transition-colors">
                  <p className="text-base md:text-lg text-gray-300">{goal}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Core Values Section */}
      <div className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-16"
          >
            {t('aboutPage.principles.title')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <PrincipleCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              } 
              title={t('aboutPage.principles.reliability.title')}
              description={t('aboutPage.principles.reliability.description')}
            />
            
            <PrincipleCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              } 
              title={t('aboutPage.principles.innovation.title')}
              description={t('aboutPage.principles.innovation.description')}
            />
            
            <PrincipleCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              } 
              title={t('aboutPage.principles.collaboration.title')}
              description={t('aboutPage.principles.collaboration.description')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Principle Card Component
const PrincipleCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors text-center group"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500 bg-opacity-20 text-emerald-400 mb-4 md:mb-6 group-hover:bg-opacity-30 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{title}</h3>
      <p className="text-sm md:text-base text-gray-400">{description}</p>
    </motion.div>
  );
};

export default VizyonMisyon; 