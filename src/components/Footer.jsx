import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ColoredLogo } from './ui/ColoredLogo';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black/50 border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            {/* <img src={demirciLogo} alt="Demirci Yazılım Logo" className="h-12 w-auto mb-4" /> */}
 
            <Link to="/" className="flex items-center">
              <ColoredLogo className="h-8 md:h-12 w-auto" />
            </Link>

            <p className="text-neutral-400 text-sm mt-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <FooterLink href="/web-tasarim">Web Tasarım</FooterLink>
              <FooterLink href="/grafik-tasarim">Grafik Tasarım</FooterLink>
              <FooterLink href="/e-ticaret">E-Ticaret Çözümleri</FooterLink>
              <FooterLink href="/dijital-pazarlama">Dijital Pazarlama</FooterLink>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.corporate')}</h3>
            <ul className="space-y-2">
              <FooterLink href="/hakkimizda">Hakkımızda</FooterLink>
              <FooterLink href="/referanslar">Referanslar</FooterLink>
              <FooterLink href="/kariyer">Kariyer</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <a href="mailto:info@demirciyazilim.com" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@demirciyazilim.com
                </a>
              </li>
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <a href="tel:+905555555555" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 555 555 55 55
                </a>
              </li>
              <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
                <a href="#" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  İstanbul, Türkiye
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-neutral-400 text-sm">
          {t('footer.copyright', { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, children }) => (
  <li className="text-neutral-400 text-sm hover:text-emerald-500 transition-colors">
    <a href={href}>{children}</a>
  </li>
); 