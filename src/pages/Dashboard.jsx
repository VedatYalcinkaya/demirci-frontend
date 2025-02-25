import React from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import NavbarDemo from "../components/NavbarDemo";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import { HeroHighlightDemo } from "../components/HeroHighlightDemo";

const Dashboard = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="relative min-h-screen bg-black group"
      onMouseMove={handleMouseMove}
    >
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
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
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
            <Route path="/wavy" element={<HeroHighlightDemo />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Dashboard;
