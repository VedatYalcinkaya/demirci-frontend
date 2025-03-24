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
import Contact from "./Contact";
import FAQ from "./FAQ";
import ReferencePage from "./ReferencePage";
import ReferenceDetailPage from "./ReferenceDetailPage";
import { Spotlight } from "../components/ui/spotlight-new";
import { AnimatedModalDemo } from "../components/AnimatedModalDemo";
import AdminPage from "./admin/AdminPage";
import AdminDashboard from "./admin/AdminDashboard";
import AdminReferencesPage from "./admin/AdminReferencesPage";
import AdminReferenceForm from "./admin/AdminReferenceForm";
import BlogPage from "./BlogPage";
import BlogDetailPage from "./BlogDetailPage";
import AdminBlogPage from "./admin/AdminBlogPage";
import AdminBlogForm from "./admin/AdminBlogForm";
import TeklifAl from "./TeklifAl";


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
  "/iletisim": "rgba(20, 184, 166, 0.2)", // İletişim - Teal
  "/iletisim/sikca-sorulan-sorular": "rgba(20, 184, 166, 0.2)", // SSS - Teal
  "/referanslar": "rgba(245, 158, 11, 0.2)", // Referanslar - Amber
  "/blog": "rgba(79, 70, 229, 0.2)", // Blog - Indigo
};

// Route'lara göre spotlight gradient renkleri
const spotlightGradients = {
  "/": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(160, 100%, 85%, .12) 0, hsla(160, 100%, 55%, .04) 50%, hsla(160, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .09) 0, hsla(160, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .06) 0, hsla(160, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/web-tasarim": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(160, 100%, 85%, .12) 0, hsla(160, 100%, 55%, .04) 50%, hsla(160, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .09) 0, hsla(160, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .06) 0, hsla(160, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/grafik-tasarim": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(200, 100%, 85%, .12) 0, hsla(200, 100%, 55%, .04) 50%, hsla(200, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .09) 0, hsla(200, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .06) 0, hsla(200, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/sanal-pazaryeri": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(270, 100%, 85%, .12) 0, hsla(270, 100%, 55%, .04) 50%, hsla(270, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 85%, .09) 0, hsla(270, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(270, 100%, 85%, .06) 0, hsla(270, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/e-ticaret": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(30, 100%, 85%, .12) 0, hsla(30, 100%, 55%, .04) 50%, hsla(30, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .09) 0, hsla(30, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .06) 0, hsla(30, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/dijital-reklamcilik": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(0, 100%, 85%, .12) 0, hsla(0, 100%, 55%, .04) 50%, hsla(0, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 85%, .09) 0, hsla(0, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 85%, .06) 0, hsla(0, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/yapay-zeka": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(240, 100%, 85%, .12) 0, hsla(240, 100%, 55%, .04) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .09) 0, hsla(240, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/biz-kimiz": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(240, 100%, 85%, .12) 0, hsla(240, 100%, 55%, .04) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .09) 0, hsla(240, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/vizyon-misyon": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(240, 100%, 85%, .12) 0, hsla(240, 100%, 55%, .04) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .09) 0, hsla(240, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/iletisim": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(170, 100%, 85%, .12) 0, hsla(170, 100%, 55%, .04) 50%, hsla(170, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(170, 100%, 85%, .09) 0, hsla(170, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(170, 100%, 85%, .06) 0, hsla(170, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/iletisim/sikca-sorulan-sorular": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(170, 100%, 85%, .12) 0, hsla(170, 100%, 55%, .04) 50%, hsla(170, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(170, 100%, 85%, .09) 0, hsla(170, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(170, 100%, 85%, .06) 0, hsla(170, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/referanslar": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(245, 100%, 85%, .12) 0, hsla(245, 100%, 55%, .04) 50%, hsla(245, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(245, 100%, 85%, .09) 0, hsla(245, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(245, 100%, 85%, .06) 0, hsla(245, 100%, 45%, .04) 80%, transparent 100%)"
  },
  "/blog": {
    first: "radial-gradient(68.54% 68.72% at 55.04% 31.46%, hsla(240, 100%, 85%, .12) 0, hsla(240, 100%, 55%, .04) 50%, hsla(240, 100%, 45%, 0) 80%)",
    second: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .09) 0, hsla(240, 100%, 55%, .04) 80%, transparent 100%)",
    third: "radial-gradient(50% 50% at 50% 50%, hsla(240, 100%, 85%, .06) 0, hsla(240, 100%, 45%, .04) 80%, transparent 100%)"
  }
};

const Dashboard = () => {
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Admin sayfasında olup olmadığını kontrol et
  const isAdminPage = location.pathname.startsWith('/admin');

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

  // Admin sayfası için sadece Routes kısmını render et
  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route path="references" element={<AdminReferencesPage />} />
          <Route path="references/new" element={<AdminReferenceForm />} />
          <Route path="references/edit/:id" element={<AdminReferenceForm />} />
          <Route path="blogs" element={<AdminBlogPage />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
        </Route>
      </Routes>
    );
  }

  // Normal sayfalar için tam render
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
          translateY={-230}
          width={800}
          height={1400}
          smallWidth={350}
          duration={10}
        />
        
        {/* Mouse Movement Effect */}
        <motion.div
          className="pointer-events-none fixed inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
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
          <Route path="/hakkimizda/biz-kimiz" element={<BizKimiz />} />
          <Route path="/hakkimizda/vizyon-misyon" element={<VizyonMisyon />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/iletisim/sikca-sorulan-sorular" element={<FAQ />} />
          <Route path="/referanslar" element={<ReferencePage />} />
          <Route path="/referanslar/:id" element={<ReferenceDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/blog/slug/:slug" element={<BlogDetailPage />} />
          <Route path="/teklif-al" element={<TeklifAl />} />
          <Route path="/animated-modal" element={<AnimatedModalDemo />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
