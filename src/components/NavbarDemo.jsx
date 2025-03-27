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
              <div className="w-6 h-5 flex flex-col justify-between will-change-transform">
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''} will-change-transform`} />
                <span className={`w-full h-0.5 bg-white transition-opacity duration-250 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''} will-change-opacity`} />
                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''} will-change-transform`} />
              </div>
            </button>
          </div>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Ana Sayfa - Dropdown olmadan direkt link */}
            <Link to="/" onMouseEnter={() => setActive(null)}>
              <span className="cursor-pointer hover:opacity-[0.9] text-white">
                {t('navbar.home')}
              </span>
            </Link>

            <div className="flex items-center">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex items-center">
              <MenuItem setActive={setActive} active={active} item={t('navbar.about')}>
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink to="/hakkimizda/biz-kimiz">{t('navbar.dropdown.about.whoWeAre')}</HoveredLink>
                  <HoveredLink to="/hakkimizda/vizyon-misyon">{t('navbar.dropdown.about.visionMission')}</HoveredLink>
                </div>
              </MenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex items-center">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

             {/* Referanslar - Dropdown olmadan direkt link */}
             <Link to="/referanslar" onMouseEnter={() => setActive(null)}>
              <span className="cursor-pointer hover:opacity-[0.9] text-white">
                {t('navbar.references')}
              </span>
            </Link>

            {/* Blog - Dropdown olmadan direkt link */}
            <Link to="/blog" onMouseEnter={() => setActive(null)}>
              <span className="cursor-pointer hover:opacity-[0.9] text-white">
                {t('navbar.blog')}
              </span>
            </Link>

            {/* Dil Değiştirici */}
            <div className="ml-4" onMouseEnter={() => setActive(null)}>
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden will-change-[opacity]"
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  mass: 1,
                  ease: "easeInOut"
                }}
                className="fixed top-0 right-0 h-screen w-[300px] bg-black/95 backdrop-blur-md z-50 md:hidden will-change-transform"
              >
                <div className="flex flex-col h-full overflow-y-auto">
                  {/* Logo Alanı */}
                  <div className="p-6 border-b border-white/10">
                    <ColoredLogo className="h-12 w-auto" />
                  </div>

                  {/* Menü Öğeleri */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-4">
                      <Link 
                        to="/" 
                        className="block py-2 px-4 text-base font-medium text-white hover:text-blue-300 transition-colors rounded hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          {t('navbar.home')}
                        </div>
                      </Link>
                      
                      <MobileMenuSection title={t('navbar.services')} titleClass="text-white" t={t}>
                        <MobileLink to="/web-tasarim" icon={webDesignLogo} onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.services.webDesign')}</MobileLink>
                        <MobileLink to="/grafik-tasarim" icon={graphicDesignLogo} onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.services.graphicDesign')}</MobileLink>
                        <MobileLink to="/sanal-pazaryeri" icon={marketplaceLogo} onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.services.marketplace')}</MobileLink>
                        <MobileLink to="/e-ticaret" icon={eCommerceLogo} onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.services.eCommerce')}</MobileLink>
                        <MobileLink to="/dijital-reklamcilik" icon={digitalAdvertisingLogo} onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.services.digitalAdvertising')}</MobileLink>
                        <MobileLink to="/yapay-zeka" icon={aiLogo} onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.services.ai')}</MobileLink>
                      </MobileMenuSection>

                      <Link 
                        to="/referanslar" 
                        className="block py-2 px-4 text-base font-medium text-white hover:text-blue-300 transition-colors rounded hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          {t('navbar.references')}
                        </div>
                      </Link>

                      <MobileMenuSection title={t('navbar.about')} titleClass="text-white" t={t}>
                        <MobileLink to="/hakkimizda/biz-kimiz" onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.about.whoWeAre')}</MobileLink>
                        <MobileLink to="/hakkimizda/vizyon-misyon" onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.about.visionMission')}</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title={t('navbar.contact')} titleClass="text-white" t={t}>
                        <MobileLink to="/iletisim" onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.contact.contactUs')}</MobileLink>
                        <MobileLink 
                          to="/teklif-al"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {t('navbar.dropdown.contact.getQuote')}
                        </MobileLink>
                        <MobileLink to="/iletisim/sikca-sorulan-sorular" onClick={() => setIsMobileMenuOpen(false)}>{t('navbar.dropdown.contact.faq')}</MobileLink>
                      </MobileMenuSection>

                      <Link 
                        to="/blog"
                        className="block py-2 px-4 text-base font-medium text-white hover:text-blue-300 transition-colors rounded hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                          </svg>
                          {t('navbar.blog')}
                        </div>
                      </Link>
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

const MobileMenuSection = ({ title, children, titleClass = "", t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t: localT } = useTranslation();
  // t fonksiyonunu prop olarak al ya da yerel olarak tanımla
  const translate = t || localT;

  return (
    <div className="mb-2 rounded-lg bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full p-4 text-base font-medium ${titleClass}`}
      >
        <div className="flex items-center">
          {title === translate('navbar.services') && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          )}
          {title === translate('navbar.about') && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
          {title === translate('navbar.contact') && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          )}
          {title}
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
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
      
      <div 
        className="overflow-hidden transition-all duration-400 ease-in-out" 
        style={{ 
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <div className="p-4 pt-0">
          <div className="space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileLink = ({ to, children, className, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    style={{ color: 'white' }}
    className="block py-2 px-4 text-base font-medium text-white hover:text-blue-300 transition-colors rounded hover:bg-white/5"
  >
    <div className="flex items-center text-white">
      {icon && (
        <img 
          src={icon} 
          alt="" 
          className="w-5 h-5 mr-2 object-contain"
        />
      )}
      <span className="text-white">{children}</span>
    </div>
  </Link>
);
