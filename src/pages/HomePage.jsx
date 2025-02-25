import React from 'react'
import { ServicesSection } from '../components/ServicesSection'
import { ReferencesSection } from '../components/ReferencesSection'
import { HeroSection } from '../components/HeroSection'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ReferencesSection />
    </div>
  )
}

export default HomePage