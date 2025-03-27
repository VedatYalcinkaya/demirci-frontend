import React, { useRef } from 'react'
import { ServicesSection } from '../components/ServicesSection'
import { HeroSection } from '../components/HeroSection'
import { ReferansPinSection } from '../components/ui/ReferansPin'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation();
  const scrollToServices = () => {
    document.getElementById('services-scroll-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  // const referanslar = [
  //   {
  //     referenceKey: "duruAnkastre",
  //     image: "https://res.cloudinary.com/ddzh9sngl/image/upload/v1743048370/DuruLogo_6-5000x1002_1_vn4trn.png",
  //     href: "https://www.duruankastre.com/",
  //     bgColor: "from-stone-300 via-stone-600 to-stone-900",
  //     // customStyle: { 
  //     //   background: "radial-gradient(ellipse at top, #44403c, #78716c, #d6d3d1)" 
  //     // }
  //   },
  //   {
  //     referenceKey: "kartvizitBahcesi",
  //     image: "https://res.cloudinary.com/ddzh9sngl/image/upload/c_thumb,w_200,g_face/v1743057768/Kartvizit_Logo2_cy2w9v.png",
  //     href: "https://www.kartvizitbahcesi.com/",
  //     bgColor: "from-amber-200 via-amber-900 to-amber-950"
  //   },
  //   {
  //     referenceKey: "ankastreConcept",
  //     image: "https://res.cloudinary.com/ddzh9sngl/image/upload/v1743057188/Ankastre_gedsei.png",
  //     href: "https://www.ankastreconcept.com/",
  //     bgColor: "from-red-200 via-red-800 to-red-950"
  //   },
  //   {
  //     referenceKey: "alternatifBant",
  //     image: "https://res.cloudinary.com/ddzh9sngl/image/upload/c_thumb,w_200,g_face/v1743057534/AlternatifBant_qsboyp.png",
  //     href: "https://www.alternatifbant.com/",
  //     bgColor: "from-yellow-200 via-yellow-900 to-yellow-950"
  //   }
 
  // ];

  return (
    <div>
      <HeroSection onCtaClick={scrollToServices} />
      <ServicesSection />
      <ReferansPinSection 
        title={t('referanslar.title')}
        description={t('referanslar.description')}
      />
    </div>
  )
}

export default HomePage