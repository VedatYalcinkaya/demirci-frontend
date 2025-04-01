import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PinContainer } from './3d-pin';
import { Link } from 'react-router-dom';

// Tek bir referans için bileşen
export const ReferansPin = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  href = "#", 
  bgColor = "from-cyan-500 via-blue-500 to-indigo-500",
  customStyle,
  referenceKey,
  referenceId,
  sectionId
}) => {
  const { t } = useTranslation();
  const defaultDescription = t('referanslar.varsayilanAciklama');
  const defaultImage = '/vite.svg';
  
  const displayTitle = referenceKey ? t(`referanslar.customReferences.${referenceKey}.title`) : title;
  const displaySubtitle = referenceKey ? t(`referanslar.customReferences.${referenceKey}.subtitle`) : subtitle;
  const displayDescription = referenceKey ? t(`referanslar.customReferences.${referenceKey}.description`) : (description || defaultDescription);
  const displayUrl = href.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  
  const gradientClass = bgColor.startsWith('bg-') 
    ? bgColor 
    : `bg-gradient-to-br ${bgColor}`;

  // Referans detay sayfasına link oluştur
  const getDetailLink = () => {
    if (referenceId && sectionId) {
      return `/referanslar/${referenceId}#${sectionId}`;
    }
    return href;
  };
  
  return (
    <div className="w-full md:w-auto px-2 py-2 md:px-3 md:py-4">
      <Link to={getDetailLink()} className="block">
        <PinContainer 
          title={displayUrl || "Referans"}
          href={getDetailLink()}
          className="w-full md:w-72 lg:w-80"
        >
          <div 
            className={`flex flex-col items-center justify-center h-64 md:h-[20rem] w-full ${gradientClass} rounded-lg p-4 text-white`}
            style={customStyle}
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
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/20 rounded-full mb-4">
                  <span className="text-lg md:text-xl font-bold">{displayTitle?.charAt(0) || "D"}</span>
                </div>
              )}
              
              <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{displayTitle}</h3>
              {displaySubtitle && <p className="text-xs md:text-sm font-medium mb-3 opacity-90 text-center">{displaySubtitle}</p>}
              
              <p className="text-xs md:text-sm text-center opacity-90 line-clamp-3">{displayDescription}</p>
            </div>
          </div>
        </PinContainer>
      </Link>
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
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Varsayılan referanslar
  const defaultReferanslar = [
    {
      referenceId: "4",
      sectionId: "duru-ankastre",
      referenceKey: "duruAnkastre",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/v1743048370/DuruLogo_6-5000x1002_1_vn4trn.png",
      href: "https://www.duruankastre.com/",
      bgColor: "from-stone-300 via-stone-600 to-stone-900",
      customStyle: { 
        background: "radial-gradient(ellipse at top, #44403c, #78716c, #d6d3d1)" 
      }
    },
    {
      referenceId: "2",
      sectionId: "kartvizit-bahcesi",
      referenceKey: "kartvizitBahcesi",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/c_thumb,w_200,g_face/v1743057768/Kartvizit_Logo2_cy2w9v.png",
      href: "https://www.kartvizitbahcesi.com/",
      bgColor: "from-amber-200 via-amber-900 to-amber-950"
    },
    {
      referenceId: "1",
      sectionId: "ankastre-concept",
      referenceKey: "ankastreConcept",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/v1743057188/Ankastre_gedsei.png",
      href: "https://www.ankastreconcept.com/",
      bgColor: "from-red-200 via-red-800 to-red-950"
    },
    { 
      referenceId: "3",
      sectionId: "alternatif-bant",
      referenceKey: "alternatifBant",
      image: "https://res.cloudinary.com/ddzh9sngl/image/upload/c_thumb,w_200,g_face/v1743057534/AlternatifBant_qsboyp.png",
      href: "https://www.alternatifbant.com/",
      bgColor: "from-yellow-200 via-yellow-900 to-yellow-950"
    }
  ];
  
  // Otomatik kaydırma için useEffect (sadece mobilde çalışır)
  useEffect(() => {
    if (!isMobile) return; // Masaüstünde çalıştırma
    
    let animationFrameId;
    const speed = 0.3; // Mobil için kaydırma hızı

    const scroll = () => {
      if (containerRef.current && !isHovered && !isDragging) {
        containerRef.current.scrollLeft += speed;
        
        // Sona geldiğinde başa dön
        if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, isMobile]);

  // Mouse/Touch sürükleme işleyicileri (sadece mobilde kullanılır)
  const handleMouseDown = (e) => {
    if (!isMobile) return; // Masaüstünde çalıştırma
    setIsDragging(true);
    setStartX(e.type === 'mousedown' ? e.pageX : e.touches[0].pageX);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isMobile) return; // Masaüstünde çalıştırma
    e.preventDefault();
    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Eğer dışarıdan referanslar verilmişse onları, yoksa varsayılanları kullan
  const useReferanslar = referanslar.length > 0 ? referanslar : defaultReferanslar;
  
  // Mobil için referansları 3 kez tekrarla, masaüstü için normal kullan
  const displayReferanslar = isMobile 
    ? [...useReferanslar, ...useReferanslar, ...useReferanslar]
    : useReferanslar;
  
  return (
    <div className="py-8 md:py-16">
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
          {title || t('referanslar.title')}
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base px-4">
          {description || t('referanslar.description')}
        </p>
      </div>
      
      {isMobile ? (
        // MOBİL GÖRÜNÜM - Kayan versiyon
        <div className="max-w-[100vw] w-full mx-auto">
          <div 
            ref={containerRef}
            className="overflow-x-hidden overflow-y-hidden relative w-full touch-pan-x"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="flex gap-1 px-0">
              {displayReferanslar.map((referans, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-500"
                  style={{ 
                    flex: '0 0 auto',
                    width: '92vw',
                    maxWidth: '92vw'
                  }}
                >
                  <ReferansPin {...referans} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // MASAÜSTÜ GÖRÜNÜM - Orijinal grid yapısı
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {displayReferanslar.map((referans, index) => (
              <div 
                key={index} 
                className="opacity-100 transform translate-y-0 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ReferansPin {...referans} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 