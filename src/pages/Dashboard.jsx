import React from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import NavbarDemo from "../components/NavbarDemo";
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./HomePage";
import { Footer } from "../components/Footer";
import WebTasarim from "./WebTasarim";
import GrafikTasarim from "./GrafikTasarim";
import SanalPazaryeri from "./SanalPazaryeri";
import ETicaret from "./ETicaret";
import DijitalReklamcilik from "./DijitalReklamcilik";
import YapayZeka from "./YapayZeka";
import BizKimiz from "./BizKimiz";
import VizyonMisyon from "./VizyonMisyon";
import { Spotlight } from "../components/ui/spotlight-new";

// Route'lara göre renk tanımlamaları
const routeColors = {
  "/": "rgba(16, 185, 129, 0.2)", // Ana sayfa - Emerald
  "/web-tasarim": "rgba(16, 185, 129, 0.2)", // Web Tasarım - Emerald
  "/grafik-tasarim": "rgba(14, 165, 233, 0.2)", // Grafik Tasarım - Sky
  "/sanal-pazaryeri": "rgba(168, 85, 247, 0.2)", // Sanal Pazaryeri - Purple
  "/e-ticaret": "rgba(249, 115, 22, 0.2)", // E-Ticaret - Orange
  "/dijital-reklamcilik": "rgba(239, 68, 68, 0.2)", // Dijital Reklamcılık - Red
  "/yapay-zeka": "rgba(99, 102, 241, 0.2)", // Yapay Zeka - Indigo
  "/biz-kimiz": "rgba(79, 70, 229, 0.2)", // Biz Kimiz - Indigo
  "/vizyon-misyon": "rgba(79, 70, 229, 0.2)", // Vizyon & Misyon - Indigo
};

// Route'lara göre spotlight gradient renkleri
const spotlightGradients = {
  "/": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(160, 100%, 85%, .08) 0, hsla(160, 100%, 55%, .02) 50%, hsla(160, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .06) 0, hsla(160, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .04) 0, hsla(160, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/web-tasarim": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(160, 100%, 85%, .08) 0, hsla(160, 100%, 55%, .02) 50%, hsla(160, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .06) 0, hsla(160, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .04) 0, hsla(160, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/grafik-tasarim": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 100%, 85%, .08) 0, hsla(200, 100%, 55%, .02) 50%, hsla(200, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .06) 0, hsla(200, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .04) 0, hsla(200, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/sanal-pazaryeri": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(270, 100%, 85%, .08) 0, hsla(270, 100%, 55%, .02) 50%, hsla(270, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 85%, .06) 0, hsla(270, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 85%, .04) 0, hsla(270, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/e-ticaret": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(30, 100%, 85%, .08) 0, hsla(30, 100%, 55%, .02) 50%, hsla(30, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .06) 0, hsla(30, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .04) 0, hsla(30, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/dijital-reklamcilik": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 100%, 85%, .08) 0, hsla(0, 100%, 55%, .02) 50%, hsla(0, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 85%, .06) 0, hsla(0, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 85%, .04) 0, hsla(0, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/yapay-zeka": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(240, 100%, 85%, .08) 0, hsla(240, 100%, 55%, .02) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .04) 0, hsla(240, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/biz-kimiz": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(240, 100%, 85%, .08) 0, hsla(240, 100%, 55%, .02) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .04) 0, hsla(240, 100%, 45%, .02) 80%, transparent 100%)"
  },
  "/vizyon-misyon": {
    first: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(240, 100%, 85%, .08) 0, hsla(240, 100%, 55%, .02) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 55%, .02) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .04) 0, hsla(240, 100%, 45%, .02) 80%, transparent 100%)"
  }
};

const Dashboard = () => {
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse hareketini izle
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Mevcut route'a göre rengi belirle
  const currentColor = routeColors[location.pathname] || routeColors["/"];
  const currentGradients = spotlightGradients[location.pathname] || spotlightGradients["/"];

  return (
    <div className="relative min-h-screen bg-black group">
      {/* Navbar */}
      <NavbarDemo className="fixed top-0 left-0 right-0 z-50" />

      {/* Background Effects Container */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Dot Pattern Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgb(51 65 85 / 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        
        {/* Spotlight Effect */}
        <Spotlight 
          gradientFirst={currentGradients.first}
          gradientSecond={currentGradients.second}
          gradientThird={currentGradients.third}
          translateY={-250}
          width={600}
          height={1200}
          smallWidth={280}
          duration={10}
        />
        
        {/* Mouse Movement Effect */}
        <motion.div
          className="pointer-events-none fixed inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                ${currentColor},
                transparent 80%
              )
            `,
          }}
        />
      </div>

      {/* Routes */}
      <div className="relative w-full min-h-screen pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/web-tasarim" element={<WebTasarim />} />
          <Route path="/grafik-tasarim" element={<GrafikTasarim />} />
          <Route path="/sanal-pazaryeri" element={<SanalPazaryeri />} />
          <Route path="/e-ticaret" element={<ETicaret />} />
          <Route path="/dijital-reklamcilik" element={<DijitalReklamcilik />} />
          <Route path="/yapay-zeka" element={<YapayZeka />} />
          <Route path="/biz-kimiz" element={<BizKimiz />} />
          <Route path="/vizyon-misyon" element={<VizyonMisyon />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
