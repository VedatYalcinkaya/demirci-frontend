"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import demirciLogo from "../assets/DemirciLogo_3.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sayfa kaydırmasını engelle/serbest bırak
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={cn("fixed top-4 inset-x-0 max-w-6xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <div className="flex w-full items-center justify-between px-4 md:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src={demirciLogo}
                alt="Demirci Yazılım Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </a>
          </div>

          {/* Hamburger Menü Butonu - Mobil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50 relative"
              aria-label="Menüyü aç/kapat"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center space-x-4">
            <MenuItem setActive={setActive} active={active} item="Hizmetlerimiz">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-tasarim">Web Tasarım</HoveredLink>
                <HoveredLink href="/grafik-tasarim">Grafik Tasarım</HoveredLink>
                <HoveredLink href="/dijital-pazarlama">Dijital Pazarlama</HoveredLink>
                <HoveredLink href="/e-ticaret">E-Ticaret Çözümleri</HoveredLink>
                <HoveredLink href="/mobil-uygulama">Mobil Uygulama</HoveredLink>
                <HoveredLink href="/yazilim-gelistirme">Yazılım Geliştirme</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Referanslar">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="E-Ticaret Projeleri"
                  href="/referanslar/e-ticaret"
                  src="https://picsum.photos/id/10/800/600"
                  description="Başarıyla tamamladığımız e-ticaret projeleri." />
                <ProductItem
                  title="Kurumsal Web Siteleri"
                  href="/referanslar/kurumsal"
                  src="https://picsum.photos/id/20/800/600"
                  description="Kurumsal müşterilerimiz için geliştirdiğimiz web siteleri." />
                <ProductItem
                  title="Mobil Uygulamalar"
                  href="/referanslar/mobil"
                  src="https://picsum.photos/id/30/800/600"
                  description="iOS ve Android platformları için geliştirdiğimiz uygulamalar." />
                <ProductItem
                  title="Özel Yazılım Projeleri"
                  href="/referanslar/yazilim"
                  src="https://picsum.photos/id/40/800/600"
                  description="Müşterilerimize özel geliştirdiğimiz yazılım çözümleri." />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Hakkımızda">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hakkimizda/biz-kimiz">Biz Kimiz</HoveredLink>
                <HoveredLink href="/hakkimizda/vizyon-misyon">Vizyon & Misyon</HoveredLink>
                <HoveredLink href="/hakkimizda/ekibimiz">Ekibimiz</HoveredLink>
                <HoveredLink href="/hakkimizda/teknolojiler">Kullandığımız Teknolojiler</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="İletişim">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/iletisim/bize-ulasin">Bize Ulaşın</HoveredLink>
                <HoveredLink href="/iletisim/teklif-al">Teklif Alın</HoveredLink>
                <HoveredLink href="/iletisim/kariyer">Kariyer</HoveredLink>
                <HoveredLink href="/iletisim/sikca-sorulan-sorular">S.S.S.</HoveredLink>
              </div>
            </MenuItem>
          </div>
        </div>

        {/* Mobil Menü - Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed top-0 right-0 h-screen w-[300px] bg-black/95 backdrop-blur-md z-50 md:hidden"
              >
                <div className="flex flex-col h-full overflow-y-auto">
                  {/* Logo Alanı */}
                  <div className="p-6 border-b border-white/10">
                    <img
                      src={demirciLogo}
                      alt="Demirci Yazılım Logo"
                      className="h-12 w-auto"
                    />
                  </div>

                  {/* Menü Öğeleri */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-4">
                      <MobileMenuSection title="Hizmetlerimiz">
                        <MobileLink href="/web-tasarim">Web Tasarım</MobileLink>
                        <MobileLink href="/grafik-tasarim">Grafik Tasarım</MobileLink>
                        <MobileLink href="/dijital-pazarlama">Dijital Pazarlama</MobileLink>
                        <MobileLink href="/e-ticaret">E-Ticaret Çözümleri</MobileLink>
                        <MobileLink href="/mobil-uygulama">Mobil Uygulama</MobileLink>
                        <MobileLink href="/yazilim-gelistirme">Yazılım Geliştirme</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title="Referanslar">
                        <MobileLink href="/referanslar/e-ticaret">E-Ticaret Projeleri</MobileLink>
                        <MobileLink href="/referanslar/kurumsal">Kurumsal Web Siteleri</MobileLink>
                        <MobileLink href="/referanslar/mobil">Mobil Uygulamalar</MobileLink>
                        <MobileLink href="/referanslar/yazilim">Özel Yazılım Projeleri</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title="Hakkımızda">
                        <MobileLink href="/hakkimizda/biz-kimiz">Biz Kimiz</MobileLink>
                        <MobileLink href="/hakkimizda/vizyon-misyon">Vizyon & Misyon</MobileLink>
                        <MobileLink href="/hakkimizda/ekibimiz">Ekibimiz</MobileLink>
                        <MobileLink href="/hakkimizda/teknolojiler">Kullandığımız Teknolojiler</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title="İletişim">
                        <MobileLink href="/iletisim/bize-ulasin">Bize Ulaşın</MobileLink>
                        <MobileLink href="/iletisim/teklif-al">Teklif Alın</MobileLink>
                        <MobileLink href="/iletisim/kariyer">Kariyer</MobileLink>
                        <MobileLink href="/iletisim/sikca-sorulan-sorular">S.S.S.</MobileLink>
                      </MobileMenuSection>
                    </div>
                  </nav>

                  {/* Alt Bilgi */}
                  <div className="p-6 border-t border-white/10">
                    <p className="text-sm text-neutral-400 text-center">
                      © 2024 Demirci Yazılım
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Menu>
    </div>
  );
}

const MobileMenuSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-base font-medium text-white"
      >
        {title}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            <div className="space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLink = ({ href, children, className = "" }) => (
  <a
    href={href}
    className={`block py-2 px-4 text-sm text-neutral-300 hover:text-white transition-colors rounded hover:bg-white/5 ${className}`}
  >
    {children}
  </a>
);
