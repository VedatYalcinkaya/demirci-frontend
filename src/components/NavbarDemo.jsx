"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import demirciLogo from "../assets/DemirciLogo_3.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

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
              <img
                src={demirciLogo}
                alt="Demirci Yazılım Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
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
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/web-tasarim">{t('navbar.dropdown.services.webDesign')}</HoveredLink>
                <HoveredLink to="/grafik-tasarim">{t('navbar.dropdown.services.graphicDesign')}</HoveredLink>
                <HoveredLink to="/sanal-pazaryeri">{t('navbar.dropdown.services.marketplace')}</HoveredLink>
                <HoveredLink to="/e-ticaret">{t('navbar.dropdown.services.eCommerce')}</HoveredLink>
                <HoveredLink to="/dijital-reklamcilik">{t('navbar.dropdown.services.digitalAdvertising')}</HoveredLink>
                <HoveredLink to="/yapay-zeka">{t('navbar.dropdown.services.ai')}</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item={t('navbar.references')}>
              <div className="text-sm grid grid-cols-2 gap-4 p-4">
                <ProductItem
                  title={t('navbar.dropdown.references.eCommerce')}
                  to="/referanslar/e-ticaret"
                  src="https://picsum.photos/id/10/800/600"
                  description={t('navbar.dropdown.references.eCommerceDesc')} />
                <ProductItem
                  title={t('navbar.dropdown.references.corporate')}
                  to="/referanslar/kurumsal"
                  src="https://picsum.photos/id/20/800/600"
                  description={t('navbar.dropdown.references.corporateDesc')} />
                <ProductItem
                  title={t('navbar.dropdown.references.mobile')}
                  to="/referanslar/mobil"
                  src="https://picsum.photos/id/30/800/600"
                  description={t('navbar.dropdown.references.mobileDesc')} />
                <ProductItem
                  title={t('navbar.dropdown.references.software')}
                  to="/referanslar/yazilim"
                  src="https://picsum.photos/id/40/800/600"
                  description={t('navbar.dropdown.references.softwareDesc')} />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item={t('navbar.about')}>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/hakkimizda/biz-kimiz">{t('navbar.dropdown.about.whoWeAre')}</HoveredLink>
                <HoveredLink to="/hakkimizda/vizyon-misyon">{t('navbar.dropdown.about.visionMission')}</HoveredLink>
                <HoveredLink to="/hakkimizda/ekibimiz">{t('navbar.dropdown.about.team')}</HoveredLink>
                <HoveredLink to="/hakkimizda/teknolojiler">{t('navbar.dropdown.about.technologies')}</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item={t('navbar.contact')}>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/iletisim/bize-ulasin">{t('navbar.dropdown.contact.contactUs')}</HoveredLink>
                <HoveredLink to="/iletisim/teklif-al">{t('navbar.dropdown.contact.getQuote')}</HoveredLink>
                <HoveredLink to="/iletisim/kariyer">{t('navbar.dropdown.contact.career')}</HoveredLink>
                <HoveredLink to="/iletisim/sikca-sorulan-sorular">{t('navbar.dropdown.contact.faq')}</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item={t('navbar.blog')}>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/blog/teknoloji">{t('navbar.dropdown.blog.technology')}</HoveredLink>
                <HoveredLink to="/blog/tasarim">{t('navbar.dropdown.blog.design')}</HoveredLink>
                <HoveredLink to="/blog/pazarlama">{t('navbar.dropdown.blog.marketing')}</HoveredLink>
                <HoveredLink to="/blog/yapay-zeka">{t('navbar.dropdown.blog.ai')}</HoveredLink>
              </div>
            </MenuItem>

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
                    <img
                      src={demirciLogo}
                      alt="Demirci Yazılım Logo"
                      className="h-12 w-auto"
                    />
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

                      <MobileMenuSection title={t('navbar.references')}>
                        <MobileLink to="/referanslar/e-ticaret">{t('navbar.dropdown.references.eCommerce')}</MobileLink>
                        <MobileLink to="/referanslar/kurumsal">{t('navbar.dropdown.references.corporate')}</MobileLink>
                        <MobileLink to="/referanslar/mobil">{t('navbar.dropdown.references.mobile')}</MobileLink>
                        <MobileLink to="/referanslar/yazilim">{t('navbar.dropdown.references.software')}</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title={t('navbar.about')}>
                        <MobileLink to="/hakkimizda/biz-kimiz">{t('navbar.dropdown.about.whoWeAre')}</MobileLink>
                        <MobileLink to="/hakkimizda/vizyon-misyon">{t('navbar.dropdown.about.visionMission')}</MobileLink>
                        <MobileLink to="/hakkimizda/ekibimiz">{t('navbar.dropdown.about.team')}</MobileLink>
                        <MobileLink to="/hakkimizda/teknolojiler">{t('navbar.dropdown.about.technologies')}</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title={t('navbar.contact')}>
                        <MobileLink to="/iletisim/bize-ulasin">{t('navbar.dropdown.contact.contactUs')}</MobileLink>
                        <MobileLink to="/iletisim/teklif-al">{t('navbar.dropdown.contact.getQuote')}</MobileLink>
                        <MobileLink to="/iletisim/kariyer">{t('navbar.dropdown.contact.career')}</MobileLink>
                        <MobileLink to="/iletisim/sikca-sorulan-sorular">{t('navbar.dropdown.contact.faq')}</MobileLink>
                      </MobileMenuSection>

                      <MobileMenuSection title={t('navbar.blog')}>
                        <MobileLink to="/blog/teknoloji">{t('navbar.dropdown.blog.technology')}</MobileLink>
                        <MobileLink to="/blog/tasarim">{t('navbar.dropdown.blog.design')}</MobileLink>
                        <MobileLink to="/blog/pazarlama">{t('navbar.dropdown.blog.marketing')}</MobileLink>
                        <MobileLink to="/blog/yapay-zeka">{t('navbar.dropdown.blog.ai')}</MobileLink>
                      </MobileMenuSection>
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
