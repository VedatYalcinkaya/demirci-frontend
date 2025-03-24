import React from 'react';
import { useTranslation } from 'react-i18next';
import { PinContainer } from './3d-pin';

// Tek bir referans için bileşen
export const ReferansPin = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  href = "#", 
  bgColor = "from-cyan-500 via-blue-500 to-indigo-500" 
}) => {
  const { t } = useTranslation();
  const defaultDescription = t('referanslar.varsayilanAciklama');
  const defaultImage = '/vite.svg'; // Var olan bir dosyayı kullanalım
  
  return (
    <div className="w-full sm:w-auto">
      <PinContainer 
        title={title || "Referans"}
        href={href}
        className="w-full sm:w-80"
      >
        <div className={`flex flex-col items-center justify-center h-[30rem] w-full bg-gradient-to-br ${bgColor} rounded-lg p-4 text-white`}>
          <div className="p-5 rounded-xl bg-white/10 backdrop-blur-sm flex flex-col items-center">
            {image ? (
              <img 
                src={image} 
                alt={title} 
                className="w-24 h-24 object-contain mb-4"
                onError={(e) => {
                  e.target.src = defaultImage;
                  e.target.onerror = null;
                }}
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-full mb-4">
                <span className="text-xl font-bold">{title?.charAt(0) || "D"}</span>
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            {subtitle && <p className="text-sm font-medium mb-3 opacity-90">{subtitle}</p>}
            
            <p className="text-sm text-center opacity-90">{description || defaultDescription}</p>
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
  
  // Eğer dışarıdan referanslar verilmediyse varsayılan örnekler kullanılır
  const defaultReferanslar = [
    {
      title: "TeknoMarket",
      subtitle: "E-Ticaret Çözümü",
      description: "Türkiye'nin önde gelen e-ticaret platformu için SEO odaklı tasarım ve performans iyileştirmeleri yaptık.",
      image: defaultImage,
      href: "https://example.com/teknomarket",
      bgColor: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      title: "Mavi Holding",
      subtitle: "Kurumsal Web Sitesi",
      description: "Modern teknolojilerle kurumsal kimliği yansıtan özel tasarım.",
      image: defaultImage,
      href: "https://example.com/maviholding",
      bgColor: "from-blue-500 via-indigo-500 to-purple-500"
    },
    {
      title: "Sağlık Plus",
      subtitle: "Sağlık Portalı",
      description: "Kullanıcı dostu arayüz ile online randevu ve hasta takip sistemi.",
      image: defaultImage,
      href: "https://example.com/saglikplus",
      bgColor: "from-purple-500 via-pink-500 to-rose-500"
    }
  ];
  
  // Dışarıdan referanslar gelmişse onları, yoksa varsayılanları kullan
  const displayReferanslar = referanslar.length > 0 ? referanslar : defaultReferanslar;
  
  return (
    <div className="py-24 container mx-auto px-4">
      <div 
        className="text-center mb-16 opacity-100 transform translate-y-0 transition-all duration-500"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title || t('referanslar.title')}
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          {description || t('referanslar.description')}
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
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
  );
}; 