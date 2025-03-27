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
          <div className="p-5 rounded-xl bg-neutral-800/30 backdrop-blur-xl border border-neutral-800/20 flex flex-col items-center">
            {image ? (
              <img 
                src={image} 
                alt={displayTitle} 
                className="w-16 h-16 md:w-24 md:h-24 object-contain mb-4"
                onError={(e) => {
                  e.target.src = defaultImage;
                  e.target.onerror = null;
                }}
              />
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
      image: defaultImage,
      href: "https://example.com/duruankastre",
      bgColor: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      referenceKey: "kartvizitBahcesi",
      image: defaultImage,
      href: "https://example.com/kartvizitbahcesi",
      bgColor: "from-blue-500 via-indigo-500 to-purple-500"
    },
    {
      referenceKey: "alternatifBant",
      image: defaultImage,
      href: "https://example.com/alternatifbant",
      bgColor: "from-purple-500 via-pink-500 to-rose-500"
    },
    {
      referenceKey: "ankastreConcept",
      image: defaultImage,
      href: "https://example.com/ankastreconcept",
      bgColor: "from-amber-500 via-orange-500 to-red-500"
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