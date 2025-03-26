"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { ColoredLogo } from "./ui/ColoredLogo";
import { Modal, ModalTrigger } from "./ui/animated-modal";
import { QuoteForm } from "./ui/quote-form";

// Hizmetler logolarını import et
import webDesignLogo from "../assets/servicesLogos/web-design-logo.png";
import graphicDesignLogo from "../assets/servicesLogos/graphic-design-logo.png";
import marketplaceLogo from "../assets/servicesLogos/marketplace-logo.png";
import eCommerceLogo from "../assets/servicesLogos/e-commerce-logo.png";
import digitalAdvertisingLogo from "../assets/servicesLogos/digital-advertising-logo.png";
import aiLogo from "../assets/servicesLogos/ai-logo.png";

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
  const location = useLocation();
  const { t } = useTranslation();

  // Sayfa kaydırmasını engelle/serbest bırak
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Sayfa değiştiğinde dropdown menüyü kapat
  React.useEffect(() => {
    setActive(null);
  }, [location]);

  return (
    <div className={cn("fixed top-4 inset-x-0 max-w-6xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <div className="flex w-full items-center justify-between px-4 md:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ColoredLogo className="h-12 md:h-16 w-auto" />
            </Link>
          </div>

          {/* Hamburger Menü Butonu - Mobil */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
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
            {/* Ana Sayfa - Dropdown olmadan direkt link */}
            <Link to="/">
              <span className="cursor-pointer hover:opacity-[0.9] text-white">
                {t('navbar.home')}
              </span>
            </Link>

            <MenuItem setActive={setActive} active={active} item={t('navbar.services')}>
              <div className="text-sm grid grid-cols-2 gap-4 p-4">
                <ProductItem
                  title={t('navbar.dropdown.services.webDesign')}
                  to="/web-tasarim"
                  src={webDesignLogo}
                  hoverColor="emerald"
                  description={t('services.webDesign.description')} />
                <ProductItem
                  title={t('navbar.dropdown.services.graphicDesign')}
                  to="/grafik-tasarim"
                  src={graphicDesignLogo}
                  hoverColor="sky"
                  description={t('services.graphicDesign.description')} />
                <ProductItem
                  title={t('navbar.dropdown.services.marketplace')}
                  to="/sanal-pazaryeri"
                  src={marketplaceLogo}
                  hoverColor="purple"
                  description={t('services.marketplace.description')} />
                <ProductItem
                  title={t('navbar.dropdown.services.eCommerce')}
                  to="/e-ticaret"
                  src={eCommerceLogo}
                  hoverColor="orange"
                  description={t('services.eCommerce.description')} />
                <ProductItem
                  title={t('navbar.dropdown.services.digitalAdvertising')}
                  to="/dijital-reklamcilik"
                  src={digitalAdvertisingLogo}
                  hoverColor="red"
                  description={t('services.digitalAdvertising.description')} />
                <ProductItem
                  title={t('navbar.dropdown.services.ai')}
                  to="/yapay-zeka"
                  src={aiLogo}
                  hoverColor="indigo"
                  description={t('services.ai.description')} />
              </div>
            </MenuItem>
            
            {/* Referanslar - Dropdown olmadan direkt link */}
            <Link to="/referanslar">
              <span className="cursor-pointer hover:opacity-[0.9] text-white">
                {t('navbar.references')}
              </span>
            </Link>
            
            <MenuItem setActive={setActive} active={active} item={t('navbar.about')}>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/hakkimizda/biz-kimiz">{t('navbar.dropdown.about.whoWeAre')}</HoveredLink>
                <HoveredLink to="/hakkimizda/vizyon-misyon">{t('navbar.dropdown.about.visionMission')}</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item={t('navbar.contact')}>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/iletisim">{t('navbar.dropdown.contact.contactUs')}</HoveredLink>
                <HoveredLink 
                  to="/teklif-al"
                  onClick={() => setActive(null)}
                >
                  {t('navbar.dropdown.contact.getQuote')}
                </HoveredLink>
                <HoveredLink to="/iletisim/sikca-sorulan-sorular">{t('navbar.dropdown.contact.faq')}</HoveredLink>
              </div>
            </MenuItem>

            {/* Ana Sayfa - Dropdown olmadan direkt link */}
            <Link to="/blog">
              <span className="cursor-pointer hover:opacity-[0.9] text-white">
                {t('navbar.blog')}
              </span>
            </Link>

            {/* Dil Değiştirici */}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
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
                    <ColoredLogo className="h-12 w-auto" />
                  </div>

                  {/* Menü Öğeleri */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-4">
                      <MobileLink to="/" className="block py-2 text-lg font-medium text-white hover:text-emerald-400 transition-colors">
                        {t('navbar.home')}
                      </MobileLink>
                      
                      <MobileMenuSection title={t('navbar.services')}>
                        <MobileLink to="/web-tasarim">{t('navbar.dropdown.services.webDesign')}</MobileLink>
                        <MobileLink to="/grafik-tasarim">{t('navbar.dropdown.services.graphicDesign')}</MobileLink>
                        <MobileLink to="/sanal-pazaryeri">{t('navbar.dropdown.services.marketplace')}</MobileLink>
                        <MobileLink to="/e-ticaret">{t('navbar.dropdown.services.eCommerce')}</MobileLink>
                        <MobileLink to="/dijital-reklamcilik">{t('navbar.dropdown.services.digitalAdvertising')}</MobileLink>
                        <MobileLink to="/yapay-zeka">{t('navbar.dropdown.services.ai')}</MobileLink>
                      </MobileMenuSection>

                      <MobileLink to="/referanslar" className="block py-2 text-lg font-medium text-white hover:text-emerald-400 transition-colors">
                        {t('navbar.references')}
                      </MobileLink>

                      <MobileMenuSection title={t('navbar.about')}>
                        <MobileLink to="/hakkimizda/biz-kimiz">{t('navbar.dropdown.about.whoWeAre')}</MobileLink>
                        <MobileLink to="/hakkimizda/vizyon-misyon">{t('navbar.dropdown.about.visionMission')}</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title={t('navbar.contact')}>
                        <MobileLink to="/iletisim">{t('navbar.dropdown.contact.contactUs')}</MobileLink>
                        <MobileLink 
                          to="/teklif-al"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {t('navbar.dropdown.contact.getQuote')}
                        </MobileLink>
                        <MobileLink to="/iletisim/sikca-sorulan-sorular">{t('navbar.dropdown.contact.faq')}</MobileLink>
                      </MobileMenuSection>

                      <MobileLink to="/blog">
                        {t('navbar.blog')}
                      </MobileLink>
                    </div>
                  </nav>

                  {/* Alt Bilgi */}
                  <div className="p-6 border-t border-white/10">
                    <p className="text-sm text-neutral-400 text-center">
                      {t('footer.copyright', { year: new Date().getFullYear() })}
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

const MobileLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`block py-2 px-4 text-sm text-neutral-300 hover:text-white transition-colors rounded hover:bg-white/5 ${className}`}
  >
    {children}
  </Link>
);
