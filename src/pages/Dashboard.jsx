import React from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import NavbarDemo from "../components/NavbarDemo";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import { Footer } from "../components/Footer";
import WebTasarim from "./WebTasarim";
import GrafikTasarim from "./GrafikTasarim";
import SanalPazaryeri from "./SanalPazaryeri";
import ETicaret from "./ETicaret";
import DijitalReklamcilik from "./DijitalReklamcilik";
import YapayZeka from "./YapayZeka";

const Dashboard = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-black group">
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
                rgba(16, 185, 129, 0.2),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      {/* Content */}
      <NavbarDemo className="fixed top-0 left-0 right-0 z-50" />

      <Router>
        <div className="relative w-full min-h-screen pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/buttons" element={<TailwindcssButtons />} /> */}
            <Route path="/web-tasarim" element={<WebTasarim />} />
            <Route path="/grafik-tasarim" element={<GrafikTasarim />} />
            <Route path="/sanal-pazaryeri" element={<SanalPazaryeri />} />
            <Route path="/e-ticaret" element={<ETicaret />} />
            <Route path="/dijital-reklamcilik" element={<DijitalReklamcilik />} />
            <Route path="/yapay-zeka" element={<YapayZeka />} />
          </Routes>
        </div>
      </Router>
      <Footer/>
    </div>
  );
};

export default Dashboard;
