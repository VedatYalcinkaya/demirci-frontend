import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PinContainer } from './3d-pin';

// Tek bir referans için bileşen
export const ReferansPin = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  href = "#", 
  bgColor = "from-cyan-500 via-blue-500 to-indigo-500",
  customStyle, // Yeni prop: özel CSS stilleri için
  referenceKey // Çeviri için kullanılacak anahtar
}) => {
  const { t } = useTranslation();
  const defaultDescription = t('referanslar.varsayilanAciklama');
  const defaultImage = '/vite.svg'; // Var olan bir dosyayı kullanalım
  
  // Eğer referenceKey varsa, bu anahtara göre çevirileri kullan
  const displayTitle = referenceKey ? t(`referanslar.customReferences.${referenceKey}.title`) : title;
  const displaySubtitle = referenceKey ? t(`referanslar.customReferences.${referenceKey}.subtitle`) : subtitle;
  const displayDescription = referenceKey ? t(`referanslar.customReferences.${referenceKey}.description`) : (description || defaultDescription);
  
  // URL'yi href'ten çıkart, www kısmını da kaldır
  const displayUrl = href.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  
  // Özel gradient için kontrol - bg- ile başlıyorsa direkt kullan, değilse varsayılan gradient formatını uygula
  const gradientClass = bgColor.startsWith('bg-') 
    ? bgColor 
    : `bg-gradient-to-br ${bgColor}`;
  
  return (
    <div className="w-full md:w-auto px-2 py-2 md:px-3 md:py-4">
      <PinContainer 
        title={displayUrl || "Referans"}
        href={href}
        className="w-full md:w-72 lg:w-80"
      >
        <div 
          className={`flex flex-col items-center justify-center h-64 md:h-[20rem] w-full ${gradientClass} rounded-lg p-4 text-white`}
          style={customStyle} // Özel stil prop'unu uygula
        >
          <div className="p-5 rounded-xl bg-stone-900/20 backdrop-blur-xl border border-neutral-800/20 flex flex-col items-center">
            {image ? (
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src={image} 
                  alt={displayTitle} 
                  className="w-full h-full object-contain max-w-full max-h-full"
                  style={{ objectPosition: 'center' }}
                  onError={(e) => {
                    e.target.src = defaultImage;
                    e.target.onerror = null;
                  }}
                />
              </div>
            ) : (
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white/20 rounded-full mb-4">
                <span className="text-lg md:text-xl font-bold">{displayTitle?.charAt(0) || "D"}</span>
              </div>
            )}
            
            <h3 className="text-lg md:text-xl font-bold mb-1 text-center">{displayTitle}</h3>
            {displaySubtitle && <p className="text-xs md:text-sm font-medium mb-3 opacity-90 text-center">{displaySubtitle}</p>}
            
            <p className="text-xs md:text-sm text-center opacity-90 line-clamp-3">{displayDescription}</p>
          </div>
        </div>
      </PinContainer>
    </div>
  );
};

// Referanslar bölümü container'ı
export const ReferansPinSection = ({ 
  title, 
  description, 
  referanslar = [] 
}) => {
  const { t } = useTranslation();
  const defaultImage = '/vite.svg'; // Var olan bir dosyayı kullanalım
  const [isMobile, setIsMobile] = useState(false);
  
  // Ekran boyutunu izleyen useEffect
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // İlk yükleme kontrolü
    checkScreenSize();
    
    // Ekran boyutu değişimini izle
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Eğer dışarıdan referanslar verilmediyse varsayılan örnekler kullanılır
  const defaultReferanslar = [
    {
      referenceKey: "duruAnkastre",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/v1743048370/DuruLogo_6-5000x1002_1_vn4trn.png",
      href: "https://www.duruankastre.com/",
      bgColor: "from-stone-300 via-stone-600 to-stone-900",
      // customStyle: { 
      //   background: "radial-gradient(ellipse at top, #44403c, #78716c, #d6d3d1)" 
      // }
    },
    {
      referenceKey: "kartvizitBahcesi",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/c_thumb,w_200,g_face/v1743057768/Kartvizit_Logo2_cy2w9v.png",
      href: "https://www.kartvizitbahcesi.com/",
      bgColor: "from-amber-200 via-amber-900 to-amber-950"
    },
    {
      referenceKey: "ankastreConcept",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/v1743057188/Ankastre_gedsei.png",
      href: "https://www.ankastreconcept.com/",
      bgColor: "from-red-200 via-red-800 to-red-950"
    },
    {
      referenceKey: "alternatifBant",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/c_thumb,w_200,g_face/v1743057534/AlternatifBant_qsboyp.png",
      href: "https://www.alternatifbant.com/",
      bgColor: "from-yellow-200 via-yellow-900 to-yellow-950"
    }
  ];
  
  // Dışarıdan referanslar gelmişse onları, yoksa varsayılanları kullan
  const displayReferanslar = referanslar.length > 0 ? referanslar : defaultReferanslar;
  
  return (
    <div className="py-12 md:py-24 container mx-auto px-4">
      <div 
        className="text-center mb-8 md:mb-16 opacity-100 transform translate-y-0 transition-all duration-500"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          {title || t('referanslar.title')}
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
          {description || t('referanslar.description')}
        </p>
      </div>
      
      {isMobile ? (
        // Mobil görünüm için özel düzen
        <div className="w-full">
          {displayReferanslar.map((referans, index) => (
            <div
              key={index}
              className="mb-8 opacity-100 transform translate-y-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ReferansPin {...referans} />
            </div>
          ))}
        </div>
      ) : (
        // Masaüstü görünümü için 3D efektli düzen
        <div className="h-auto min-h-[30rem] md:min-h-[40rem] w-full flex flex-wrap items-center justify-center">
          {displayReferanslar.map((referans, index) => (
            <div
              key={index}
              className="opacity-100 transform translate-y-0 transition-all duration-500 mb-4"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ReferansPin {...referans} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 