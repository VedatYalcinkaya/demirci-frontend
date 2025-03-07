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

// Route'lara göre renk tanımlamaları
const routeColors = {
  "/": "rgba(16, 185, 129, 0.2)", // Ana sayfa - Emerald
  "/web-tasarim": "rgba(16, 185, 129, 0.2)", // Web Tasarım - Emerald
  "/grafik-tasarim": "rgba(14, 165, 233, 0.2)", // Grafik Tasarım - Sky
  "/sanal-pazaryeri": "rgba(168, 85, 247, 0.2)", // Sanal Pazaryeri - Purple
  "/e-ticaret": "rgba(249, 115, 22, 0.2)", // E-Ticaret - Orange
  "/dijital-reklamcilik": "rgba(239, 68, 68, 0.2)", // Dijital Reklamcılık - Red
  "/yapay-zeka": "rgba(99, 102, 241, 0.2)", // Yapay Zeka - Indigo
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
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
