import React from "react";
import NavbarDemo from "../components/NavbarDemo";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import { HeroParallaxDemo } from "../components/HeroParallaxDemo";


const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-black/[0.96] overflow-hidden">
      {/* Aurora efekti */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at top right,
                rgba(19, 231, 160, 0.3),    /* emerald-500 */
                rgba(6, 182, 212, 0.20) 25%,   /* cyan-500 */
                rgba(5, 150, 105, 0.10) 50%,  /* emerald-600 */
                transparent 100%
              )
            `,
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* Beam efekti */}
      <BackgroundBeamsWithCollision className="absolute inset-0 z-10" />

      {/* İçerik */}
      <div className="relative z-20">
        <NavbarDemo className="fixed top-0 left-0 right-0 z-50" />
      </div>

    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/try" element={<HeroParallaxDemo />} />
        </Routes>
      </div>
    </Router>

      
      
    </div>
  );
};

export default Dashboard;
