import React, { useRef } from 'react'
import { ServicesSection } from '../components/ServicesSection'
import { ReferencesSection } from '../components/ReferencesSection'
import { HeroSection } from '../components/HeroSection'

const HomePage = () => {
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection onCtaClick={scrollToServices} />
      <div ref={servicesRef}>
        <ServicesSection />
      </div>
      <ReferencesSection />
    </div>
  )
}

export default HomePage