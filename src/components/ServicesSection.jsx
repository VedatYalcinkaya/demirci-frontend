"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
import { ColourfulText } from "./ui/colourful-text";
import webDesignLogo from "../assets/servicesLogos/web-design-logo.png";
import graphicDesignLogo from "../assets/servicesLogos/graphic-design-logo.png";
import marketplaceLogo from "../assets/servicesLogos/marketplace-logo.png";
import eCommerceLogo from "../assets/servicesLogos/e-commerce-logo.png";
import digitalAdvertisingLogo from "../assets/servicesLogos/digital-advertising-logo.png";
import aiLogo from "../assets/servicesLogos/ai-logo.png";
import { WavyBackground } from "./ui/wavy-background";

export function ServicesSection() {
  return (
    <div className="relative z-10 py-20 mt-[-10vh] flex flex-col items-center justify-center w-full">
      {/* Başlık Kısmı */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Her İhtiyaca <ColourfulText text="Profesyonel" /> Çözümler
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Web tasarımdan yapay zekaya, dijital dünyanın her alanında
          yanınızdayız
        </p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="WEB TASARIM"
            icon={webDesignLogo}
            description="Özel ve profesyonel web tasarım hizmetlerimizle, işletmenizi dijital dünyada en iyi şekilde temsil eden estetik ve kullanıcı dostu web siteleri tasarlıyoruz. Mobil uyumlu, hızlı yüklenen ve SEO optimizasyonlu sitelerle dijital varlığınızı güçlendiriyoruz."
            bgColor="bg-emerald-900"
          />
          <ServiceCard
            title="GRAFİK TASARIM"
            icon={graphicDesignLogo}
            description="Markanızın kimliğini güçlendiren yaratıcı ve etkileyici grafik tasarım çözümleri sunuyoruz. Logo tasarımından, sosyal medya içeriklerine kadar geniş bir yelpazede hizmet veriyoruz."
            bgColor="bg-sky-900"
          />
          <ServiceCard
            title="SANAL PAZARYERİ"
            icon={marketplaceLogo}
            description="Hepsiburada, Trendyol, N11 gibi popüler sanal pazaryerlerinde başarılı olmanız için danışmanlık hizmeti veriyoruz. Ürün listeleme, fiyatlandırma ve mağaza yönetimi konularında destek sağlıyoruz."
            bgColor="bg-purple-900"
          />
          <ServiceCard
            title="E-TİCARET DANIŞMANLIĞI"
            icon={eCommerceLogo}
            description="E-ticaret sitenizin kurulumundan, yönetimine kadar tüm süreçlerde profesyonel danışmanlık hizmeti sunuyoruz. Satış stratejileri, stok yönetimi ve müşteri deneyimi optimizasyonu konularında uzman desteği sağlıyoruz."
            bgColor="bg-orange-900"
          />
          <ServiceCard
            title="DİJİTAL REKLAMCILIK"
            icon={digitalAdvertisingLogo}
            description="Google Ads, Facebook Ads ve diğer dijital reklam platformlarında etkili kampanyalar oluşturuyoruz. Hedef kitlenize ulaşmanızı sağlayacak optimize edilmiş reklam stratejileri geliştiriyoruz."
            bgColor="bg-red-900"
          />
          <ServiceCard
            title="VERİ ANALİZİ VE YAPAY ZEKA"
            icon={aiLogo}
            description="İşletmenizin verilerini analiz ederek, yapay zeka destekli çözümler sunuyoruz. Müşteri davranışları analizi, satış tahminleri ve otomatik karar destek sistemleri ile işletmenizi geleceğe hazırlıyoruz."
            bgColor="bg-indigo-900"
          />
        </div>
      </div>
    </div>
  );
}

const ServiceCard = ({ title, icon, description, bgColor }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/[0.2] rounded-xl group/card flex items-center justify-center w-full p-4 relative h-[300px]"
    >
      <CardBorder />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0 rounded-xl overflow-hidden"
          >
            <CanvasRevealEffect
              animationSpeed={2}
              containerClassName={bgColor}
              colors={[[125, 211, 252]]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        {/* Logo */}
        <div
          className={`transition-all duration-300 ${
            hovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          {typeof icon === "string" ? (
            <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          ) : (
            icon
          )}
        </div>

        {/* Başlık */}
        <h2
          className={`text-2xl font-bold text-white transition-all duration-300 ${
            hovered ? "-translate-y-8" : "translate-y-2"
          }`}
        >
          {title}
        </h2>

        {/* Açıklama */}
        <p
          className={`text-white/80 text-sm max-w-[300px] mx-auto transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const CardBorder = () => {
  return (
    <>
      <div className="absolute h-2 w-2 border-t-2 border-l-2 border-white/[0.2] top-0 left-0" />
      <div className="absolute h-2 w-2 border-t-2 border-r-2 border-white/[0.2] top-0 right-0" />
      <div className="absolute h-2 w-2 border-b-2 border-l-2 border-white/[0.2] bottom-0 left-0" />
      <div className="absolute h-2 w-2 border-b-2 border-r-2 border-white/[0.2] bottom-0 right-0" />
    </>
  );
};

const WebIcon = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6L21 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 12L21 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 18L21 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const GraphicIcon = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 7L12 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 12L7 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MarketplaceIcon = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M7 8H17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 12H17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 16H13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ECommerceIcon = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H5.62L6.72 16.43C6.78 17.02 6.98 17.58 7.33 18.05C7.68 18.52 8.16 18.87 8.71 19.07C9.27 19.27 9.87 19.31 10.45 19.19C11.03 19.07 11.56 18.79 12 18.39L17.55 13.79C18.11 13.32 18.75 12.94 19.45 12.65C20.14 12.36 20.88 12.17 21.63 12.09L22 12.04"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 20C9.1 20 10 19.1 10 18C10 16.9 9.1 16 8 16C6.9 16 6 16.9 6 18C6 19.1 6.9 20 8 20Z"
      fill="currentColor"
    />
    <path
      d="M19 20C20.1 20 21 19.1 21 18C21 16.9 20.1 16 19 16C17.9 16 17 16.9 17 18C17 19.1 17.9 20 19 20Z"
      fill="currentColor"
    />
  </svg>
);

const AdvertisingIcon = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M7 9L12 12L17 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 12V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const AIIcon = () => (
  <svg
    className="w-16 h-16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
